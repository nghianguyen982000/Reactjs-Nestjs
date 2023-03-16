/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

@Injectable()
export class ClouldinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
  //   async uploadVideo(file:Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>{
  //     console.log(file)
  //     return new Promise((resolve, reject) => {
  //         const upload = v2.uploader.upload(file.path, {
  //           resource_type: "video",
  //           public_id: file.originalname,
  //           chunk_size: 6000000,
  //           overwrite: true,
  //         },(err, result) => {
  //           return result
  //       });
  //         toStream(file.buffer).pipe(upload);
  //       });
  // }
  async uploadVideo(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
