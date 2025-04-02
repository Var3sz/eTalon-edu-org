import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { GroupDTO } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getGroups(): Promise<GroupDTO[]> {
    return this.prisma.group.findMany();
  }
}
