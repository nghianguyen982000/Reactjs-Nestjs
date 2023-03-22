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
  async insertVideo(insertVideo: InsertVideoDto) {
    const video = await this.prismaService.video.create({
      data: {
        ...insertVideo,
        courseId: Number(insertVideo.courseId),
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
      data: video,
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
  async updateVideo(videoId: number, updateVideo: UpdateVideoDto) {
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
    await this.destroyVideo(video.publicId);
    return {
      success: true,
      data: videoDeleted,
    };
  }
  async destroyVideo(public_id: string) {
    const resp = await this.clouldinaryService.destroyVideo(public_id);
    if (!resp) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Delete video fail!',
          error: 'Delete video fail',
          success: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      success: true,
    };
  }
  async uploadVideo(file: Express.Multer.File) {
    const resp = await this.clouldinaryService.uploadVideo(file);
    if (!resp) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Upload video fail!',
          error: 'Upload video fail',
          success: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      success: true,
      data: {
        url: resp.url,
        public_id: resp.public_id,
        duration: resp.duration,
      },
    };
  }
}
