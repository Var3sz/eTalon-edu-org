import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/role.guard';

import { LocationDto, UpdateLocationsInputDto } from './entities/location.entity';
import { LocationService } from './location.service';

@ApiTags('Locations')
@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private locationService: LocationService) {}

  @Get('/GetLocations')
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: LocationDto, isArray: true })
  async getLocations(): Promise<LocationDto[]> {
    return this.locationService.getLocations();
  }

  @Put('/UpdateLocations')
  @ApiOkResponse({ type: LocationDto, isArray: true })
  @UseGuards(JwtGuard, AdminGuard)
  @ApiBody({ type: UpdateLocationsInputDto, isArray: true })
  async updateGroups(@Body() inputDto: UpdateLocationsInputDto[]): Promise<LocationDto[]> {
    return this.locationService.updateLocations(inputDto);
  }
}
