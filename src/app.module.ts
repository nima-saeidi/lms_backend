import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoursesModule } from './courses/courses.module';
import { PaymentsModule } from './payments/payments.module';

import { EnrollmentsModule } from './enrollments/enrollments.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { GradesModule } from './grades/grades.module';
import { ProfileModule } from './profile/profile.module';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/yourdb',
    ),
    AuthModule,
    UsersModule,
    DashboardModule,
    CoursesModule,
    EnrollmentsModule,
    GradesModule,
    PaymentsModule,
    ProfileModule,
    WorkflowsModule
  ],

})
export class AppModule {}
