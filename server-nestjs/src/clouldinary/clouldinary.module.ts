/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { ClouldinaryService } from './clouldinary.service';

@Global()
@Module({
  providers: [ClouldinaryService],
  exports: [ClouldinaryService]
})
export class ClouldinaryModule {}