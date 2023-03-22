/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateVideoDto {
  @IsString()
  @IsOptional()
  chapter?: string;

  @IsString()
  @IsOptional()
  lesson?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsNumber()
  @IsOptional()
  courseId?: number;

  @IsString()
  @IsOptional()
  publicId?: string;
  
  @IsString()
  @IsOptional()
  duration?: string;
}
