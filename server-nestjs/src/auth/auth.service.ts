/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from '@prisma/client'
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { RegisterDto } from "./dto/register.dto";
@Injectable()
export class AuthService {
    constructor(
        private prismaService:PrismaService,
        private jwtService:JwtService,
        private configService:ConfigService,
        ) { 

    }
    async register(registerDto:RegisterDto){
        const hashedPassword= await argon.hash(registerDto.password)
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
                    createdAt: true
                }
            })
            const accessToken=await this.signJwtToken(user.id, user.email)
            return  {
                accessToken,
                success:true,
                message:'User created successfully'
            }
        } catch (error) {
            if(error.code == 'P2002') {
                throw new HttpException({
                    statusCode: HttpStatus.FORBIDDEN,
                    message: "User with this userName already exists",
                    error: 'Forbidden',
                    success:false
                  }, HttpStatus.FORBIDDEN);
            }                 
        }
    }
    async login(authDto:AuthDto){
        const user = await this.prismaService
                        .user.findUnique({
                            where: {
                                userName:authDto.userName
                            }
                        })
        if(!user) {
            throw new  ()
        }   
        const passwordMatched= await argon.verify(user.hashedPassword,authDto.password)
        if(!passwordMatched){
            throw new ForbiddenException(
                'Incorrect password'
            )
        }
        delete user.hashedPassword
        const accessToken=await this.signJwtToken(user.id, user.userName)
        return  {
            success: true,
            message: "User logged in successfully",
            accessToken, 
            role:user.role,
            user
        }
    }
    async signJwtToken(userId: number, email: string)
        :Promise<{accessToken: string}>{
        const payload = {
            sub: userId,
            email
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '100m',
            secret: this.configService.get('JWT_SECRET')
        })
        return {
            accessToken: jwtString,
        }
    }
}