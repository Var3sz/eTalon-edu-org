import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PackageService } from './package.service';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}
}
