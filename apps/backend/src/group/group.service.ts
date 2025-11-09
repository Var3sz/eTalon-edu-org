import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { GroupDto, UpdateGroupsInputDto } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gives back all of the Groups
   * @returns {GroupDto[]} Groups (maths, literature/grammar etc.)
   */
  async getGroups(): Promise<GroupDto[]> {
    return this.prisma.group.findMany({
      where: { isDeleted: 'N' },
      orderBy: { id: 'asc' },
    });
  }

  async updateGroups(inputDto: UpdateGroupsInputDto[]): Promise<GroupDto[]> {
    const ops = inputDto.map((row) => {
      const { id, ...data } = row;

      if (id !== undefined && id !== null) {
        return this.prisma.group.update({
          where: { id: id },
          data: data,
        });
      }

      return this.prisma.group.create({
        data: data,
      });
    });

    const groups = await this.prisma.$transaction(ops);
    return groups;
  }
}
