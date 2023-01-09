/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { InsertCourseDto } from "./dto/insert.course.dto";

@Injectable()
export class CourseService{
    constructor(private prismaService:PrismaService){}
   async insertCourse(insertCourse:InsertCourseDto){
            const course=await this.prismaService.course.create({
                data:{
                    ...insertCourse
                }
            })
            if(course){
                throw new ForbiddenException(
                    'Failfully'
                )
            }
            return course
    }
}