import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { GroupDto } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gives back all of the Groups
   * @returns {GroupDto[]} Groups (maths, literature/grammar etc.)
   */
  async getGroups(): Promise<GroupDto[]> {
    return this.prisma.group.findMany();
  }
}
