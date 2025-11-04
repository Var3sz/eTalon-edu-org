import { Module } from '@nestjs/common';

import { LocationsController } from './location.controller';
import { LocationService } from './location.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Module({
  controllers: [LocationsController],
  providers: [LocationService, JwtService],
})
export class LocationModule {}
