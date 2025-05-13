import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SAPIService } from 'src/SAPI/SAPI.service';

import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [HttpModule],
  controllers: [StudentController],
  providers: [StudentService, SAPIService],
})
export class StudentModule {}
