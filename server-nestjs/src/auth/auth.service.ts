/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from '@prisma/client'
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService) { 

    }
    async register(authDto:AuthDto){
        const hashedPassword= await argon.hash(authDto.password)
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: authDto.email,
                    hashedPassword: hashedPassword,
                    firstName: '',
                    lastName: '',
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                }
            })
            return user
        } catch (error) {
            if(error.code == 'P2002') {
                throw new ForbiddenException(
                    'User with this email already exists'
                )
            }                 
        }
    }
    async login(authDto:AuthDto){
        const user = await this.prismaService
                        .user.findUnique({
                            where: {
                                email: authDto.email
                            }
                        })
        if(!user) {
            throw new ForbiddenException(
                'User not found'
            )
        }   
        return {
            message: "Login"
        }
    }
}