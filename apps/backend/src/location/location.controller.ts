import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LocationDTO } from './entities/location.entity';
import { LocationService } from './location.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationService) {}

  @Get('/GetLocations')
  @ApiResponse({ status: 200, description: 'Success', type: [LocationDTO] })
  async getLocations(): Promise<LocationDTO[]> {
    return this.locationService.getLocations();
  }
}
