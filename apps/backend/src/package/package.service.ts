import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { AssignPackageToCourseDto, CreatePackageDto, PackageCourseAssignDto, PackageDto } from './dto/package.entity';

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
        Group: true,
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
      groupId: pkg.groupId,
      groupDesc: pkg.Group.description,
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

  async getActivePackagesAndCoursesByGroupAndLocation(
    type: string,
    groupId: number,
    locationId: number
  ): Promise<PackageCourseAssignDto> {
    // dinamikus groupId szűrő
    let groupIdFilter: { groupId: number | { in: number[] } };

    switch (type) {
      case 'C':
        groupIdFilter = { groupId: { in: [1, 2] } };
        break;
      case 'A':
        groupIdFilter = { groupId: { in: [2, 3] } };
        break;
      case 'B':
      default:
        groupIdFilter = { groupId: { in: [1] } };
        break;
    }

    const packages = await this.prisma.package.findMany({
      where: {
        type,
        locationId,
        active: true,
        ...groupIdFilter,
      },
      select: {
        packageId: true,
      },
    });

    const courses = await this.prisma.course.findMany({
      where: {
        locationId,
        active: true,
        ...groupIdFilter,
      },
      select: {
        id: true,
        courseId: true,
      },
    });

    const assignments = await this.prisma.course_Package.findMany({
      where: {
        courseId: { in: courses.map((c) => c.id) },
        packageId: { in: packages.map((p) => p.packageId) },
      },
      select: {
        courseId: true,
        packageId: true,
      },
    });

    return { packages, courses, assignments };
  }

  async assignCourseToPackage(assignments: AssignPackageToCourseDto[]): Promise<any> {
    const results = [];

    for (const { courseId, packageId, assign } of assignments) {
      if (assign) {
        const existing = await this.prisma.course_Package.findFirst({
          where: { courseId, packageId },
        });

        if (!existing) {
          const created = await this.prisma.course_Package.create({
            data: { courseId, packageId },
          });
          results.push({ courseId, packageId, status: 'created', record: created });
        } else {
          results.push({ courseId, packageId, status: 'already exists' });
        }
      } else {
        results.push({ courseId, packageId, status: 'skipped (assign is false)' });
      }
    }

    return results;
  }
}
