/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClouldinaryService {
    uploadImage(file){
        console.log(file)
    }
    
}