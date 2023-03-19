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
import { VideoService } from './video.service';
import { InsertVideoDto, UpdateVideoDto } from './dto';

@UseGuards(MyJwtGuard) //you can also make your own "decorator"
@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  insertVideo(
    @Body() insertVideo: InsertVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.videoService.insertVideo(insertVideo, file);
  }
  @Get()
  getVideos(@Query('courseId') courseId: string) {
    return this.videoService.getVideos(courseId);
  }
  @Get(':id')
  getVideo(@Param('id', ParseIntPipe) videoId: number) {
    return this.videoService.getVideo(videoId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  updateVideo(
    @Param('id', ParseIntPipe) videoId: number,
    @Body() updateVideo: UpdateVideoDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(updateVideo);
    return this.videoService.updateVideo(videoId, updateVideo, file);
  }
  @Delete()
  deleteVideo(@Query('id', ParseIntPipe) videoId: number) {
    return this.videoService.deleteVideo(videoId);
  }
}
