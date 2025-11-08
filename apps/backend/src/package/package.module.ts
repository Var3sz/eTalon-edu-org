import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PackageHelpers } from './helpers/package.helpers';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';

@Module({
  controllers: [PackageController],
  providers: [PackageService, PackageHelpers, JwtService],
})
export class PackageModule {}
