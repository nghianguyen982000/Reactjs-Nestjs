/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
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
        const user = await this.prismaService.user.create({
            data: {
                email: authDto.email,
                hashedPassword: hashedPassword,
                firstName: '',
                lastName: '',
            }
        })
        return user
    }
    login(){
        return {
            message: "Login"
        }
    }
}