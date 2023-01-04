/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    password: string
    
    @IsString()
    @IsNotEmpty()
    userName: string
    
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    nameAccount: string

    @IsString()
    @IsNotEmpty()
    role: string
}