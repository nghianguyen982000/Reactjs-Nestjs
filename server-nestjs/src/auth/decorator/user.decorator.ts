/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (key: string, context: ExecutionContext) => {    
    const request:Request = context.switchToHttp().getRequest().user;    
    const user = request
    return key ? user?.[key] : user
  },
);