/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClouldinaryService } from 'src/clouldinary/clouldinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCourseDto } from './dto';
import { InsertCourseDto } from './dto/insert.course.dto';

@Injectable()
export class CourseService {
  constructor(
    private prismaService: PrismaService,
    private clouldinaryService: ClouldinaryService,
  ) {}
  async insertCourse(insertCourse: InsertCourseDto, file: Express.Multer.File) {
    const image = await this.clouldinaryService.uploadImage(file);
    const course = await this.prismaService.course.create({
      data: {
        ...insertCourse,
        image: image.url,
        benefit: insertCourse.benefit.split('\n'),
      },
    });
    if (!course) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Fail',
          error: 'Bad request',
          success: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      success: true,
      message: 'Successfully!!!',
      data: course,
    };
  }
  async getCourses(search: string) {
    const courses = await this.prismaService.course.findMany({
      where: {
        title: {
          search: search,
        },
      },
      // include: { videos: true },
    });
    if (!courses) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Fail',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const listField = courses.map((item) => item.field);
    let newListField = [];
    newListField = listField.filter((item) => {
      return newListField.includes(item) ? '' : newListField.push(item);
    });
    return {
      success: true,
      data: courses,
      listField: newListField,
    };
  }
  async getCourse(courseId: number) {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Course not found',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      data: course,
    };
  }
  async updateCourse(
    courseId: number,
    updateCourse: UpdateCourseDto,
    file: Express.Multer.File,
  ) {
    const course = await this.prismaService.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cannot find Course to update',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const newCourse = await this.prismaService.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...updateCourse,
        benefit: updateCourse.benefit.split('\n'),
        image: file
          ? await (
              await this.clouldinaryService.uploadImage(file)
            ).url
          : updateCourse.image,
      },
    });
    return {
      success: true,
      message: 'Excellent progress',
      data: newCourse,
    };
  }
  async deleteCourse(courseId: number) {
    const course = await this.prismaService.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!course) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cannot find Course to delete',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const courseDeleted = await this.prismaService.course.delete({
      where: {
        id: courseId,
      },
    });
    return {
      success: true,
      data: courseDeleted,
    };
  }
}
