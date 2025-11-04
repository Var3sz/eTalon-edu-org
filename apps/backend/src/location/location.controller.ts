import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LocationDto } from './entities/location.entity';
import { LocationService } from './location.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Locations')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationService) {}

  @Get('/GetLocations')
  @ApiOkResponse({ type: LocationDto, isArray: true })
  async getLocations(): Promise<LocationDto[]> {
    return this.locationService.getLocations();
  }
}
