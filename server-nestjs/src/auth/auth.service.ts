/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(registerDto: RegisterDto) {
    const hashedPassword = await argon.hash(registerDto.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: registerDto.email,
          hashedPassword: hashedPassword,
          nameAccount: registerDto.nameAccount,
          userName: registerDto.userName,
          role: registerDto.role,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      const accessToken = await this.signJwtToken(user.id, user.email);
      return {
        accessToken,
        success: true,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error.code == 'P2002') {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'User with this userName already exists',
            error: 'Forbidden',
            success: false,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }
  async login(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        userName: authDto.userName,
      },
    });
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const passwordMatched = await argon.verify(
      user.hashedPassword,
      authDto.password,
    );
    if (!passwordMatched) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Incorrect password',
          error: 'Bad request',
          success: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    delete user.hashedPassword;
    const accessToken = await this.signJwtToken(user.id, user.userName);
    return {
      success: true,
      message: 'User logged in successfully',
      accessToken,
      role: user.role,
      user,
    };
  }
  async signJwtToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '100m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return jwtString;
  }
  async checkLogin(req: Request) {
    const authHeaders = req.headers.authorization;
    try {
      if (!authHeaders && !(authHeaders as string).split(' ')[1]) {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }
      const token = (authHeaders as string).split(' ')[1];
      const decoded = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      const user = await this.prismaService.user.findUnique({
        where: {
          id: decoded.sub,
        },
      });
      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'User not found',
            error: 'Not found',
            success: false,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      delete user.hashedPassword;
      return {
        success: true,
        user,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Not authorized',
          error: 'Not authorized',
          success: false,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
