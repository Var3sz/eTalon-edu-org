import { Test } from '@nestjs/testing';
import { GroupDto } from 'src/group/entities/group.entity';
import { GroupController } from 'src/group/group.controller';
import { GroupService } from 'src/group/group.service';

describe('GroupController', () => {
  let controller: GroupController;

  const serviceMock = {
    getGroups: jest.fn<Promise<GroupDto[]>, []>(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [{ provide: GroupService, useValue: serviceMock }],
    }).compile();

    controller = module.get<GroupController>(GroupController);
  });

  it('Controller delegates to the service and returns the group data', async () => {
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
});
