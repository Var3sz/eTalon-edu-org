import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/role.guard';

import { GroupDto, UpdateGroupsInputDto } from './entities/group.entity';
import { GroupService } from './group.service';

@ApiTags('Groups')
@ApiBearerAuth()
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('/GetGroups')
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: GroupDto, isArray: true })
  async getGroups(): Promise<GroupDto[]> {
    return this.groupService.getGroups();
  }

  @Put('/UpdateGroups')
  @UseGuards(JwtGuard, AdminGuard)
  @ApiOkResponse({ type: GroupDto, isArray: true })
  @ApiBody({ type: UpdateGroupsInputDto, isArray: true })
  async updateGroups(@Body() inputDto: UpdateGroupsInputDto[]): Promise<GroupDto[]> {
    return this.groupService.updateGroups(inputDto);
  }
}
