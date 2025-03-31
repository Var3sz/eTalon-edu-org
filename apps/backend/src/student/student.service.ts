import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { StudentDetailsDTO, UpdateStudentDetailsDTO } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async updateStudentDetails(id: number, requestBody: UpdateStudentDetailsDTO): Promise<StudentDetailsDTO> {
    try {
      return await this.prisma.student.update({
        where: { id },
        data: requestBody,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`A(z) ${id} azonosítójú diák nem található.`);
      }
      throw new InternalServerErrorException('Nem várt hiba történt');
    }
  }
}
