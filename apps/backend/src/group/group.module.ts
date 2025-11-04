import { Module } from '@nestjs/common';

import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Module({
  controllers: [GroupController],
  providers: [GroupService, JwtService],
})
export class GroupModule {}
