/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
export class InsertCourseDto{
    title: string 
    description: string
    image: string
    benifit: string
    field: string
}