import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { AssignPackageToCourseDto, CreatePackageDto, PackageCourseAssignDto, PackageDto } from './dto/package.entity';
import { PackageHelpers } from './helpers/package.helpers';

@Injectable()
export class PackageService {
  constructor(
    private prisma: PrismaService,
    private packageHelpers: PackageHelpers
  ) {}

  /**
   * @returns All of the active packages
   */
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

    const parsedPackages = this.packageHelpers.parsePackages(packages);
    return parsedPackages;
  }

  /**
   * @param createBody - Incoming package dto
   * @returns - The created packages
   */
  async createPackages(createBody: CreatePackageDto[]): Promise<PackageDto[]> {
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
      console.error('Failed to create packages:', error);
      throw error;
    }
  }

  /**
   * Return the acive packages and courses by package type and location
   * @param type - The type of the Package: can be A, B and C
   * @param locationId
   * @returns
   */

  async getActivePackagesAndCoursesByGroupAndLocation(
    type: string,
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

  /**
   * @param assignments - Course-Packages pairs which need to be assigned or unassigned
   * @returns - Number of deletes, creates and skips
   */
  async assignCourseToPackage(
    assignments: AssignPackageToCourseDto[]
  ): Promise<{ created: number; deleted: number; skipped: number }> {
    const toCreate = assignments.filter((a) => a.assign).map(({ courseId, packageId }) => ({ courseId, packageId }));
    const toDelete = assignments.filter((a) => !a.assign).map(({ courseId, packageId }) => ({ courseId, packageId }));

    // Tranzakcióban kezeljük, mert törölni is kellhet a kapcsolótáblából!
    const tx: any[] = [];

    // Hozzárendelések létrehozása, a duplikáltakat skipeljük!
    if (toCreate.length) {
      tx.push(
        this.prisma.course_Package.createMany({
          data: toCreate,
          skipDuplicates: true,
        })
      );
    }

    // Korábbi hozzárendelések törlése, ha egy sor nem létezik, akkor nem töröl!
    if (toDelete.length) {
      tx.push(this.prisma.course_Package.deleteMany({ where: { OR: toDelete } }));
    }

    if (tx.length === 0) {
      return { created: 0, deleted: 0, skipped: assignments.length };
    }

    const results = await this.prisma.$transaction(tx);

    // createMany és deleteMany visszatérési értéke: { count: number }
    let created = 0;
    let deleted = 0;
    const skipped = assignments.length - toCreate.length - toDelete.length;

    if (toCreate.length && toDelete.length) {
      created = results[0]?.count ?? 0;
      deleted = results[1]?.count ?? 0;
    } else if (toCreate.length) {
      created = results[0]?.count ?? 0;
    } else if (toDelete.length) {
      deleted = results[0]?.count ?? 0;
    }

    return { created, deleted, skipped };
  }

  async inactivatePackageById(id: number): Promise<any> {
    return await this.prisma.package.update({
      where: { id: id },
      data: { active: false },
    });
  }
}
