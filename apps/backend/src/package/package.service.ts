import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreatePackageDto, PackageDto } from './dto/package.entity';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async getPackages(): Promise<PackageDto[]> {
    const packages = await this.prisma.package.findMany({
      where: {
        active: true,
      },
      include: {
        Location: true,
      },
    });

    return packages.map((pkg) => ({
      id: pkg.id,
      type: pkg.type,
      packageId: pkg.packageId,
      price: pkg.price,
      locationId: pkg.locationId,
      locationDesc: pkg.Location.description,
      active: pkg.active,
    }));
  }

  /**
   * Function for creating packages
   */
  async createPackages(createBody: CreatePackageDto[]) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const createdPackages = [];

        for (const pkg of createBody) {
          const created = await tx.package.create({
            data: pkg,
          });

          createdPackages.push(created);
        }

        return createdPackages;
      });
    } catch (error) {
      console.error('Failed to create courses:', error);
      throw error;
    }
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
