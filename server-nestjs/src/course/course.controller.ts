/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  UseInterceptors,
  ParseFilePipeBuilder,
  UploadedFile,
  Query,
  ParseIntPipe,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
//import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { CourseService } from './course.service';
import { InsertCourseDto, UpdateCourseDto } from './dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @UseGuards(MyJwtGuard) //you can also make your own "decorator"
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  insertCourse(
    @Body() insertCourse: InsertCourseDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 10048576,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.courseService.insertCourse(insertCourse, file);
  }
  @Get()
  getCourses() {
    return this.courseService.getCourses();
  }
  @Get(':id')
  getCourse(@Param('id', ParseIntPipe) courseId: number) {
    return this.courseService.getCourse(courseId);
  }
  @UseGuards(MyJwtGuard) //you can also make your own "decorator"
  @Patch(':id')
  updateCourse(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() updateCourse: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(courseId, updateCourse);
  }
  @UseGuards(MyJwtGuard) //you can also make your own "decorator"
  @Delete()
  deleteCourse(@Query('id', ParseIntPipe) courseId: number) {
    return this.courseService.deleteCourse(courseId);
  }
}
