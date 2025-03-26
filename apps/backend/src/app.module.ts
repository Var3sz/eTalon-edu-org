import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { UsersModule } from './users/users.module';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { StudentModule } from './student/student.module';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    CourseModule,
    AuthModule,
    UsersModule,
    StudentModule,
  ],
  controllers: [AppController, CourseController, StudentController],
  providers: [AppService, CourseService, StudentService],
})
export class AppModule {}
