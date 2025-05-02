import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PackageService } from './package.service';
import { PackageDto } from './dto/package.entity';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Get('/GetPackagesByCourseId/:id')
  @ApiOkResponse({ type: PackageDto, isArray: true })
  async getPackagesByCourseId(@Param('id', ParseIntPipe) id: number): Promise<PackageDto[]> {
    return await this.packageService.getPackagesByCourseId(id);
  }
}
