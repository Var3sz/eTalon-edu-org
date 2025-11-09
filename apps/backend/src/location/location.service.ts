import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { LocationDto, UpdateLocationsInputDto } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getLocations(): Promise<LocationDto[]> {
    return this.prisma.location.findMany({
      where: { isDeleted: 'N' },
      orderBy: { id: 'asc' },
    });
  }

  async updateLocations(inputDto: UpdateLocationsInputDto[]): Promise<LocationDto[]> {
    const ops = inputDto.map((row) => {
      const { id, ...data } = row;

      if (id !== undefined && id !== null) {
        return this.prisma.location.update({
          where: { id: id },
          data: data,
        });
      }

      return this.prisma.location.create({
        data: data,
      });
    });

    const locations = await this.prisma.$transaction(ops);
    return locations;
  }
}
