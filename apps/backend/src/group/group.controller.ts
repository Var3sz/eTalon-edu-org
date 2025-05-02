import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GroupDto } from './entities/group.entity';
import { GroupService } from './group.service';

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/GetGroups')
  @ApiOkResponse({ type: GroupDto, isArray: true })
  async getGroups(): Promise<GroupDto[]> {
    return this.groupService.getGroups();
  }
}
