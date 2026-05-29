// enrollments/enrollments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment, EnrollmentSchema } from './enrollments.schema';


@Module({
imports: [MongooseModule.forFeature([{ name: Enrollment.name, schema: EnrollmentSchema }])],
controllers: [EnrollmentsController],
providers: [EnrollmentsService],
})
export class EnrollmentsModule {}