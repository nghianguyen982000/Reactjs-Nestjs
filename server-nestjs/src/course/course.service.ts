/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateCourseDto } from "./dto";
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
            if(!course){
                throw new ForbiddenException(
                    'Failfully'
                )
            }
            return course
    }
   async getCourses(){
            const courses=await this.prismaService.course.findMany()
            if(!courses){
                throw new ForbiddenException(
                    'Failfully'
                )
            }
            return courses
    }
   async getCourse(courseId:number){
            const courses=await this.prismaService.course.findFirst({
                where:{
                    id:courseId
                }
            })
            if(!courses){
                throw new ForbiddenException(
                    'Failfully'
                )
            }
            return courses
    }
   async updateCourse(courseId:number,updateCourse:UpdateCourseDto){
            const course=await this.prismaService.course.findUnique({
                where:{
                    id:courseId
                }
            })
            if(!course){
                throw new ForbiddenException(
                    'Cannot find Note to update'
                )
            }
            return this.prismaService.course.update({
                where: {
                    id: courseId
                },
                data: {...updateCourse}
            })
    }
   async deleteCourse(courseId:number){
            const course=await this.prismaService.course.findUnique({
                where:{
                    id:courseId
                }
            })
            if(!course){
                throw new ForbiddenException(
                    'Cannot find Note to delete'
                )
            }
            return this.prismaService.course.delete({
                where: {
                    id: courseId
                }
            })
    }
}