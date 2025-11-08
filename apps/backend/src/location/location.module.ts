import { Module } from '@nestjs/common';

import { LocationsController } from './location.controller';
import { LocationService } from './location.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationService, JwtService, UserService],
})
export class LocationModule {}
