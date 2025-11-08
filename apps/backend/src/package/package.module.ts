import { Module } from '@nestjs/common';

import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { PackageHelpers } from './helpers/package.helpers';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Module({
  controllers: [PackageController],
  providers: [PackageService, PackageHelpers, JwtService],
})
export class PackageModule {}
