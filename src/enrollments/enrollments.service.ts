import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from './enrollments.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>,
  ) {}

  async create(studentId: string, dto: CreateEnrollmentDto) {
    const exists = await this.enrollmentModel.findOne({ studentId, courseId: dto.courseId });
    if (exists) throw new ForbiddenException('Already enrolled');
    return this.enrollmentModel.create({ studentId, courseId: dto.courseId });
  }

  async findMyEnrollments(studentId: string) {
    return this.enrollmentModel.find({ studentId }).exec();
  };

  async findAllEnrollments() {
    return this.enrollmentModel.find().exec();
  }


  // متد جدید برای حذف درس
  async remove(studentId: string, courseId: string) {
    const deletedEnrollment = await this.enrollmentModel.findOneAndDelete({ 
      studentId, 
      courseId 
    });

    if (!deletedEnrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return { message: 'Course successfully dropped', courseId };
  }
}
