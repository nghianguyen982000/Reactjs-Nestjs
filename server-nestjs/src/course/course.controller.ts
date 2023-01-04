/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
//import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express'
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { CourseService } from './course.service';
import { InsertCourseDto } from './dto/insert.course.dto';

@Controller('courses')
export class CourseController {
    constructor( private courseService:CourseService){}
    @UseGuards(MyJwtGuard) //you can also make your own "decorator"
    @Get()
    insertCourse(@Body() insertCourse:InsertCourseDto ) {
        return this.courseService.insertCourse(insertCourse)
    }  
}