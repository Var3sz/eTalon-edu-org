import { Module } from '@nestjs/common';

import { LocationsController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationService],
})
export class LocationModule {}
