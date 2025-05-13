import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PackageService } from './package.service';
import { CreatePackageDto, PackageDto } from './dto/package.entity';

@ApiTags('Package')
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
}
