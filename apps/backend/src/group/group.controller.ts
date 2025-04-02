import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { GroupDTO } from './entities/group.entity';
import { GroupService } from './group.service';

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/GetGroups')
  @ApiResponse({ status: 200, description: 'Success', type: [GroupDTO] })
  async getGroups(): Promise<GroupDTO[]> {
    return this.groupService.getGroups();
  }
}
