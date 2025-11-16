import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [CourseService, JwtService],
})
export class CourseModule {}
