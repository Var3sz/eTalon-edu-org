import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { GroupDto } from './entities/group.entity';
import { GroupService } from './group.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Groups')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/GetGroups')
  @ApiOkResponse({ type: GroupDto, isArray: true })
  async getGroups(): Promise<GroupDto[]> {
    return this.groupService.getGroups();
  }
}
