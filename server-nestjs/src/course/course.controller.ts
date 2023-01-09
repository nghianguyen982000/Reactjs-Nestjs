/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
//import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express'
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { CourseService } from './course.service';
import { InsertCourseDto } from './dto';

@UseGuards(MyJwtGuard) //you can also make your own "decorator"
@Controller('courses')
export class CourseController {
    constructor( private courseService:CourseService){}
    @Post()
    insertCourse(@Body() insertCourse:InsertCourseDto ) {
        return this.courseService.insertCourse(insertCourse)
    }  
}