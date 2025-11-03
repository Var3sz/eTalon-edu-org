import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BillingAddressTypeModule } from './billing-type/billing-address-type.module';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';
import { LocationModule } from './location/location.module';
import { PackageModule } from './package/package.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    CourseModule,
    StudentModule,
    BillingAddressTypeModule,
    LocationModule,
    GroupModule,
    UserModule,
    AuthModule,
    PackageModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
