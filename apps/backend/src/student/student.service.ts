import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CourseStudentsDTO, StudentDetailsDTO, UpdateStudentDetailsDTO } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getAllStudentNamesByCourseId(id: number): Promise<CourseStudentsDTO[]> {
    return this.prisma.studentDetailsView.findMany({ where: { courseId: id } });
  }

  async getChildrenDetailsById(id: number): Promise<StudentDetailsDTO> {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async updateChildrenData(id: number, requestBody: UpdateStudentDetailsDTO): Promise<StudentDetailsDTO> {
    try {
      return this.prisma.student.update({
        where: { id: id },
        data: requestBody,
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(`A(z) ${id} azonosítójú diák nem található.`);
      }
      throw new InternalServerErrorException('Nem várt hiba történt');
    }
  }
}
