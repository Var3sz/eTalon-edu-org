import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePackageDto, PackageDto } from './dto/package.entity';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  /**
   * @param courseId - id of the course
   * @returns - packages of the course with the given id
   */
  async getPackagesByCourseId(courseId: number): Promise<PackageDto[]> {
    try {
      const coursePackages = await this.prisma.course_Package.findMany({
        where: {
          courseId: courseId,
        },
        include: {
          Package: true,
        },
      });

      return coursePackages.map((cp) => {
        const { id, packageId, price } = cp.Package;
        return { id, packageId, price };
      });
    } catch (error) {
      throw error;
    }
  }

  async createPackages(courseId: number, createBody: CreatePackageDto[]): Promise<PackageDto[]> {
    try {
      return this.prisma.$transaction(async (tx) => {
        const packages = await Promise.all(
          createBody.map((p) => {
            return tx.package.create({ data: p });
          })
        );

        for (const pkg of packages) {
          const existingLinksCount = await tx.course_Package.count({
            where: {
              packageId: pkg.packageId,
            },
          });

          if (existingLinksCount >= 2) {
            throw new Error(`Package ${pkg.packageId} is already linked to ${existingLinksCount} course(s)`);
          }
        }

        await tx.course_Package.createMany({
          data: packages.map((pkg) => ({
            courseId: courseId,
            packageId: pkg.packageId,
          })),
        });

        return packages;
      });
    } catch (error) {
      throw error;
    }
  }
}
