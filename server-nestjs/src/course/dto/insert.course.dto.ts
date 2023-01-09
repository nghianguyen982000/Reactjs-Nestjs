/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
export class InsertCourseDto{
    @IsString()
    @IsNotEmpty()
    title: string 

    @IsString()
    @IsOptional()
    description: string
    
    @IsString()
    @IsOptional()
    image: string

    @IsString()
    @IsOptional()
    benifit: string
    
    @IsString()
    @IsOptional()
    field: string
}