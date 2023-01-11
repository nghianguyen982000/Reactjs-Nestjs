/* eslint-disable prettier/prettier */
import {  HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ClouldinaryService } from "src/clouldinary/clouldinary.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateCourseDto } from "./dto";
import { InsertCourseDto } from "./dto/insert.course.dto";

@Injectable()
export class CourseService{
    constructor(private prismaService:PrismaService,private clouldinaryService:ClouldinaryService){}
   async insertCourse(insertCourse:InsertCourseDto){
            this.clouldinaryService.uploadImage(insertCourse.file)
            console.log(insertCourse)
            const course=await this.prismaService.course.create({
                data:{
                    ...insertCourse
                }
            })
            if(!course){
                throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "Fail",
                    error: 'Bad request',
                    success:false
                  }, HttpStatus.BAD_REQUEST);
            }
            return {
                success:true,
                message: 'Successfully!!!',
                course
            }
    }
   async getCourses(){
            const courses=await this.prismaService.course.findMany()
            if(!courses){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Fail",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            const listField = courses.map((item) => (item.field))
            let newListField = []
            newListField = listField.filter((item) => {
                return newListField.includes(item) ? '' : newListField.push(item)
            })
            return {
                success:true,
                data:courses,
                listField:newListField
            }
    }
   async getCourse(courseId:number){
            const course=await this.prismaService.course.findFirst({
                where:{
                    id:courseId
                }
            })
            if(!course){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Course not found",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            return {
                success:true,
                course
            }
    }
   async updateCourse(courseId:number,updateCourse:UpdateCourseDto){
            const course=await this.prismaService.course.findUnique({
                where:{
                    id:courseId
                }
            })
            if(!course){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Cannot find Course to update",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            const newCourse=await this.prismaService.course.update({
                where: {
                    id: courseId
                },
                data: {...updateCourse}
            })
            return{
                success: true,
                message: 'Excellent progress',
                course: newCourse
            }
    }
   async deleteCourse(courseId:number){
            const course=await this.prismaService.course.findUnique({
                where:{
                    id:courseId
                }
            })
            if(!course){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Cannot find Course to delete",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            const courseDeleted=await this.prismaService.course.delete({
                where: {
                    id: courseId
                }
            })
            return {
                success: true,
                course: courseDeleted
            }
    }
}