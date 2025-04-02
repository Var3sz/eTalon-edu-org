import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { LocationDTO } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async getLocations(): Promise<LocationDTO[]> {
    return this.prisma.location.findMany();
  }
}
