import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { StudentDetailsDTO, UpdateStudentDetailsDTO } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  /*async updateChildrenData(id: number, requestBody: UpdateStudentDetailsDTO): Promise<StudentDetailsDTO> {
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
  }*/
}
