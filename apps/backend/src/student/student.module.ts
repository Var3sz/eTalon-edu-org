import { Module } from '@nestjs/common';

import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { SAPIService } from 'src/SAPI/SAPI.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [StudentController],
  providers: [StudentService, SAPIService],
})
export class StudentModule {}
