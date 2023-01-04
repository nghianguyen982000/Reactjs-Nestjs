/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { RegisterDto } from "./dto/register.dto";
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){
    }
    @Post("register")
    register(@Body() registerDto:RegisterDto ) {
        return this.authService.register(registerDto)
    }
    @Post("login")
    login(@Body() authDto:AuthDto ){
        return this.authService.login(authDto)
    }   
}