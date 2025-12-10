import { Test } from '@nestjs/testing';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/role.guard';
import { GroupDto, UpdateGroupsInputDto } from 'src/group/entities/group.entity';
import { GroupController } from 'src/group/group.controller';
import { GroupService } from 'src/group/group.service';

describe('GroupController', () => {
  let controller: GroupController;

  const serviceMock = {
    getGroups: jest.fn<Promise<GroupDto[]>, []>(),
    updateGroups: jest.fn<Promise<GroupDto[]>, [UpdateGroupsInputDto[]]>(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [{ provide: GroupService, useValue: serviceMock }],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<GroupController>(GroupController);
  });

  it('Querying groups', async () => {
    const rows: GroupDto[] = [
      { id: 1, description: 'Maths', isDeleted: 'N' },
      { id: 2, description: 'Literature', isDeleted: 'N' },
    ];

    serviceMock.getGroups.mockResolvedValue(rows);

    const result = await controller.getGroups();

    expect(result).toEqual(rows);
    expect(serviceMock.getGroups).toHaveBeenCalledTimes(1);
    expect(serviceMock.getGroups).toHaveBeenCalledWith();
  });

  it('Creating and modifying groups', async () => {
    const input: UpdateGroupsInputDto[] = [
      { id: 1, description: 'Updated group', isDeleted: 'N' },
      { id: null, description: 'New group', isDeleted: 'N' },
    ];

    const output: GroupDto[] = [
      { id: 1, description: 'Updated group', isDeleted: 'N' },
      { id: 3, description: 'New group', isDeleted: 'N' },
    ];

    serviceMock.updateGroups.mockResolvedValue(output);

    const result = await controller.updateGroups(input);

    expect(result).toEqual(output);
    expect(serviceMock.updateGroups).toHaveBeenCalledTimes(1);
    expect(serviceMock.updateGroups).toHaveBeenCalledWith(input);
  });
});
