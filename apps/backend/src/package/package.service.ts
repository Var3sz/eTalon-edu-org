import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreatePackageDto, PackageDto } from './dto/package.entity';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async createPackages(createBody: CreatePackageDto[]): Promise<PackageDto[]> {
    return await this.prisma.$transaction(createBody.map((pkg) => this.prisma.package.create({ data: pkg })));
  }

  /* async getPackagesForCourseAssignment(groupId: number) {
    try {
      const activeCourses = await this.prisma.course.findMany({
        where: {
          groupId,
          active: true,
        },
        select: {
          id: true,
          courseId: true,
        },
      });

      const packages = await this.prisma.package.findMany({
        where: {
          groupId,
        },
        select: {
          id: true,
          packageId: true,
        },
      });

      return {
        activeCourses,
        packages,
      };
    } catch (error) {
      console.error('Hiba a csoport adatainak lekérdezésekor:', error);
      throw error;
    }
  } */
}
