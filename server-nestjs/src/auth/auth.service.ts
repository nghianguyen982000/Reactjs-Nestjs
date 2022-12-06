/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { User } from '@prisma/client'
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService) { 

    }
    register(){
        return {
            message: "Registering"
        }
    }
    login(){
        return {
            message: "Login"
        }
    }
}