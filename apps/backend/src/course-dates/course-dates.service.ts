import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CourseDatesService {
  constructor(private prisma: PrismaService) {}

  async getCourseDatesOfCourse(courseId: number) {
    const courseDates = await this.prisma.course_CourseDate.findMany({
      where: {
        courseId,
      },
      select: {
        courseDate: true,
      },
    });

    return courseDates
      .map((entry) => entry.courseDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
