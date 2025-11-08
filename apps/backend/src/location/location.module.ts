import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import { LocationsController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationService, JwtService, UserService],
})
export class LocationModule {}
