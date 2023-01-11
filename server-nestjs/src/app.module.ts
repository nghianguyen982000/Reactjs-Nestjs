/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClouldinaryModule } from './clouldinary/clouldinary.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule,ClouldinaryModule,PrismaModule,UserModule,CourseModule,ConfigModule.forRoot({isGlobal: true})],
})
export class AppModule {}
