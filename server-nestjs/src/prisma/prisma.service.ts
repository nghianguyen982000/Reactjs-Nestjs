/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
//This service is used to connect DB
export class PrismaService extends PrismaClient{
    constructor(){
        super({
            datasources: {
                db:{
                    //we need to secure this !
                    url: 'postgresql://postgres:password1234@localhost:5432/postgres?schema=public'
                                       
                }
            }
        })
    }
}