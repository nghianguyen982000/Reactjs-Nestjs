/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { User } from '@prisma/client'
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
@Injectable()
export class AuthService {
    constructor(private prismaService:PrismaService) { 

    }
    register(authDto:AuthDto){
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