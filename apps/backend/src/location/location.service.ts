import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { LocationDto } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getLocations(): Promise<LocationDto[]> {
    return this.prisma.location.findMany();
  }
}
