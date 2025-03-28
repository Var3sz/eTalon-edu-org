import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CoursesDTO } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAllCourses(): Promise<CoursesDTO[]> {
    return this.prisma.courseSummaryOverview.findMany({ where: { active: true } });
  }
}
