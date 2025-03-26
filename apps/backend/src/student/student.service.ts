import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getAllStudentNamesByCourseId(id: number): Promise<StudentEntity[]> {
    const childrenData = await this.prisma.student.findMany({
      where: { courseId: id },
      select: { children: true },
    });
    return childrenData.map((child) => ({ name: child.children }));
  }
}
