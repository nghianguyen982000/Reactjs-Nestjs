/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"
export class InsertVideoDto{
    chapter: string 
    lesson: string
    title: string
    url: string
    courseId: number
}