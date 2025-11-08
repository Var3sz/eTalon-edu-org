import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SAPIService } from 'src/SAPI/SAPI.service';

import { StudentHelpers } from './helpers/student.helpers';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [HttpModule],
  controllers: [StudentController],
  providers: [StudentService, StudentHelpers, SAPIService, JwtService],
})
export class StudentModule {}
