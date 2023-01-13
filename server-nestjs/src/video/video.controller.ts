/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param,UseInterceptors,ParseFilePipeBuilder,UploadedFile,Query, ParseIntPipe,Delete, Patch, Post, Req, UseGuards,HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
//import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express'
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { VideoService } from './video.service';
import { InsertVideoDto, UpdateVideoDto } from './dto';

@UseGuards(MyJwtGuard) //you can also make your own "decorator"
@Controller('videos')
export class VideoController {
    constructor( private videoService:VideoService){}
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    insertVideo(@Body() insertVideo:InsertVideoDto,@UploadedFile(new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: 10048576
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),) file: Express.Multer.File ) {
        return this.videoService.insertVideo(insertVideo,file)
    } 
    @Get() 
    getVideos() {
        return this.videoService.getVideos()
    }  
    @Get(':id') 
    getVideo(@Param('id',ParseIntPipe) videoId:number) {
        return this.videoService.getVideo(videoId)
    }  

    @Patch(':id') 
    updateVideo(@Param('id',ParseIntPipe) videoId:number,@Body() updateVideo:UpdateVideoDto ) {
        return this.videoService.updateVideo(videoId,updateVideo)
    } 
    @Delete()    
    deleteVideo(@Query('id', ParseIntPipe) videoId: number){        
        return this.videoService.deleteVideo(videoId)
    } 

}