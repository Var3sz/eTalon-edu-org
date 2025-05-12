import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PackageService } from './package.service';
import { PackageDto } from './dto/package.entity';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}
}
