/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as cloudinary from 'cloudinary';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClouldinaryService } from 'src/clouldinary/clouldinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateVideoDto } from './dto';
import { InsertVideoDto } from './dto/insert.video.dto';

@Injectable()
export class VideoService {
  constructor(
    private prismaService: PrismaService,
    private clouldinaryService: ClouldinaryService,
  ) {}
  async insertVideo(insertVideo: InsertVideoDto, file: Express.Multer.File) {
    const image = await this.clouldinaryService.uploadImage(file);
    const video = await this.prismaService.video.create({
      data: {
        ...insertVideo,
        courseId: Number(insertVideo.courseId),
        url: image.url,
      },
    });
    if (!video) {
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
      video,
    };
  }
  async getVideos(courseId: string) {
    const videos = await this.prismaService.video.findMany({
      where: {
        courseId: Number(courseId),
      },
    });
    if (!videos) {
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

    return {
      success: true,
      data: videos,
    };
  }
  async getVideo(videoId: number) {
    const video = await this.prismaService.video.findFirst({
      where: {
        id: videoId,
      },
    });
    if (!video) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Video not found',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      success: true,
      data: video,
    };
  }
  async updateVideo(
    videoId: number,
    updateVideo: UpdateVideoDto,
    file: Express.Multer.File,
  ) {
    const video = await this.prismaService.video.findUnique({
      where: {
        id: videoId,
      },
    });
    if (!video) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cannot find Video to update',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const newVideo = await this.prismaService.video.update({
      where: {
        id: videoId,
      },
      data: {
        ...updateVideo,
        url: file
          ? await (
              await this.clouldinaryService.uploadImage(file)
            ).url
          : updateVideo.url,
      },
    });
    return {
      success: true,
      message: 'Excellent progress',
      data: newVideo,
    };
  }
  async deleteVideo(videoId: number) {
    const video = await this.prismaService.video.findUnique({
      where: {
        id: videoId,
      },
    });
    if (!video) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Cannot find Video to delete',
          error: 'Not found',
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const videoDeleted = await this.prismaService.video.delete({
      where: {
        id: videoId,
      },
    });
    return {
      success: true,
      data: videoDeleted,
    };
  }
}
