import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
