import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LocationDto } from './entities/location.entity';
import { LocationService } from './location.service';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationService) {}

  @Get('/GetLocations')
  @ApiOkResponse({ type: LocationDto, isArray: true })
  async getLocations(): Promise<LocationDto[]> {
    return this.locationService.getLocations();
  }
}
