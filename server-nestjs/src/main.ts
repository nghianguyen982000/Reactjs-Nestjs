/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{bodyParser:true});
  app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
  app.use(bodyParser.json({ limit: '30mb' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5001);
}
bootstrap();
