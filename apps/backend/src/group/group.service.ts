import { Injectable } from '@nestjs/common';

import { GroupDTO } from './entities/group.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getGroups(): Promise<GroupDTO[]> {
    return this.prisma.group.findMany();
  }
}
