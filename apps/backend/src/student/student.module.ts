import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SAPIService } from 'src/SAPI/SAPI.service';

import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentHelpers } from './helpers/student.helpers';

@Module({
  imports: [HttpModule],
  controllers: [StudentController],
  providers: [StudentService, StudentHelpers, SAPIService],
})
export class StudentModule {}
