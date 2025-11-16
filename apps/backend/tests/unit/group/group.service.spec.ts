import { PrismaService } from 'nestjs-prisma';
import { GroupDto } from 'src/group/entities/group.entity';
import { GroupService } from 'src/group/group.service';

describe('GroupService', () => {
  let prismaService: PrismaService;
  let groupService: GroupService;

  beforeEach(() => {
    prismaService = {
      group: {
        findMany: jest.fn(),
      },
    } as unknown as PrismaService;
    groupService = new GroupService(prismaService);
  });

  describe('getGroups', () => {
    it('should return all groups', async () => {
      const rows: GroupDto[] = [
        { id: 1, description: 'Group1' },
        { id: 2, description: 'Group2' },
      ];

      (prismaService as any).group.findMany.mockResolvedValue(rows);

      const result = await groupService.getGroups();

      expect(result).toEqual(rows);
      expect(prismaService.group.findMany).toHaveBeenCalledTimes(1);
      expect(prismaService.group.findMany).toHaveBeenCalledWith();
    });
  });
});
