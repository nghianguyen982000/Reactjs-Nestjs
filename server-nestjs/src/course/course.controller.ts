/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param,Query, ParseIntPipe,Delete, Patch, Post, Req, UseGuards,HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { User } from '@prisma/client';
//import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express'
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { CourseService } from './course.service';
import { InsertCourseDto, UpdateCourseDto } from './dto';

@UseGuards(MyJwtGuard) //you can also make your own "decorator"
@Controller('courses')
export class CourseController {
    constructor( private courseService:CourseService){}
    @Post()
    insertCourse(@Body() insertCourse:InsertCourseDto ) {
        return this.courseService.insertCourse(insertCourse)
    } 
    @Get() 
    getCourses() {
        return this.courseService.getCourses()
    }  
    @Get(':id') 
    getCourse(@Param('id',ParseIntPipe) courseId:number) {
        return this.courseService.getCourse(courseId)
    }  

    @Patch(':id') 
    updateCourse(@Param('id',ParseIntPipe) courseId:number,@Body() updateCourse:UpdateCourseDto ) {
        return this.courseService.updateCourse(courseId,updateCourse)
    } 
    @Delete()    
    deleteCourse(@Query('id', ParseIntPipe) courseId: number){        
        return this.courseService.deleteCourse(courseId)
    } 

}