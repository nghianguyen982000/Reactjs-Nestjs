/* eslint-disable prettier/prettier */
import {  HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ClouldinaryService } from "src/clouldinary/clouldinary.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateVideoDto } from "./dto";
import { InsertVideoDto } from "./dto/insert.video.dto";

@Injectable()
export class VideoService{
    constructor(private prismaService:PrismaService,private clouldinaryService:ClouldinaryService){}
   async insertVideo(insertVideo:InsertVideoDto,file:Express.Multer.File){
           const image=await this.clouldinaryService.uploadImage(file)
            const video=await this.prismaService.video.create({
                data:{
                    ...insertVideo,
                    url:image.url
                }
            })
            if(!video){
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
                video
            }
    }
   async getVideos(){
            const videos=await this.prismaService.video.findMany()
            if(!videos){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Fail",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            
            return {
                success:true,
                data:videos,
            }
    }
   async getVideo(videoId:number){
            const video=await this.prismaService.video.findFirst({
                where:{
                    id:videoId
                }
            })
            if(!video){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Video not found",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            return {
                success:true,
                video
            }
    }
   async updateVideo(videoId:number,updateVideo:UpdateVideoDto){
            const video=await this.prismaService.video.findUnique({
                where:{
                    id:videoId
                }
            })
            if(!video){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Cannot find Video to update",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            const newVideo=await this.prismaService.video.update({
                where: {
                    id: videoId
                },
                data: {...updateVideo}
            })
            return{
                success: true,
                message: 'Excellent progress',
                video: newVideo
            }
    }
   async deleteVideo(videoId:number){
            const video=await this.prismaService.video.findUnique({
                where:{
                    id:videoId
                }
            })
            if(!video){
                throw new HttpException({
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Cannot find Video to delete",
                    error: 'Not found',
                    success:false
                  }, HttpStatus.NOT_FOUND);
            }
            const videoDeleted=await this.prismaService.video.delete({
                where: {
                    id: videoId
                }
            })
            return {
                success: true,
                video: videoDeleted
            }
    }
}