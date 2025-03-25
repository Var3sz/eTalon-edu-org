import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAllCourses(): Promise<CourseEntity[]> {
    return this.prisma.coursesummaryview.findMany({ where: { active: true } });
  }
}
