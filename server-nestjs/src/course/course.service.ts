import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { InsertCourseDto } from "./dto/insert.course.dto";

@Injectable()
export class CourseService{
    constructor(private prismaService:PrismaService){}
   async insertCourse(insertCourse:InsertCourseDto){
        try {
            const course=await this.prismaService.

        } catch (error) {
            if(error){
                throw new ForbiddenException(
                    'Failfully'
                )
            }
        }
    }
}