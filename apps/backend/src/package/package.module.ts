import { Module } from '@nestjs/common';

import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { PackageHelpers } from './helpers/package.helpers';

@Module({
  controllers: [PackageController],
  providers: [PackageService, PackageHelpers],
})
export class PackageModule {}
