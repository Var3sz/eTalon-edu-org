import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { AssignPackageToCourseDto, CreatePackageDto, PackageDto } from './dto/package.entity';
import { PackageService } from './package.service';

@ApiTags('Package')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('packages')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Get('/GetPackages')
  @ApiOkResponse({ type: PackageDto, isArray: true })
  async GetPackages(): Promise<PackageDto[]> {
    return await this.packageService.getPackages();
  }

  @Post('/CreatePackages')
  @ApiOkResponse({ type: PackageDto, isArray: true })
  @ApiBody({ type: CreatePackageDto, isArray: true })
  async CreatePackages(@Body() createBody: CreatePackageDto[]): Promise<PackageDto[]> {
    return await this.packageService.createPackages(createBody);
  }

  @Get('/GetPackagesAndCoursesByLocGroupType')
  async getPackagesAndCourses(@Query('type') type: string, @Query('locationId') locationId: number) {
    return await this.packageService.getActivePackagesAndCoursesByGroupAndLocation(type, locationId);
  }

  @Post('AssignPackagesToCourses')
  @ApiOkResponse({})
  @ApiBody({ type: AssignPackageToCourseDto, isArray: true })
  async assignCoursesToPackages(@Body() assignments: AssignPackageToCourseDto[]) {
    return this.packageService.assignCourseToPackage(assignments);
  }
}
