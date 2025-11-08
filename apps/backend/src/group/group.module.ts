import { Module } from '@nestjs/common';

import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, JwtService, UserService],
})
export class GroupModule {}
