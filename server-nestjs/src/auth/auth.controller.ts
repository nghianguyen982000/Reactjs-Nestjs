/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){
    }
    @Post("register")
    register(@Body() authDto:AuthDto ) {
        return this.authService.register(authDto)
    }
    @Post("login")
    login(){
        return this.authService.login()
    }   
}