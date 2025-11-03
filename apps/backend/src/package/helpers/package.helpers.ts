import { Injectable } from '@nestjs/common';
import { Group, Location, Package } from '@prisma/client';
import { PackageDto } from '../dto/package.entity';

@Injectable()
export class PackageHelpers {
  constructor() {}

  parsePackages(packages: any[]): PackageDto[] {
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
}
