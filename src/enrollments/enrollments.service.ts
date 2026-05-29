import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './enrollments.schema';

@Injectable()
export class EnrollmentsService {
  constructor(@InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>) {}

  async enroll(studentId: string, courseId: string) {
    const exists = await this.enrollmentModel.findOne({ studentId, courseId }).exec();
    if (exists) throw new BadRequestException('شما قبلاً این درس را اخذ کرده‌اید');

    const created = new this.enrollmentModel({ studentId, courseId });
    await created.save();
    return { id: created._id.toString(), studentId, courseId };
  }

  async findMyEnrollments(studentId: string) {
    const list = await this.enrollmentModel.find({ studentId }).lean().exec();
    return list.map(e => ({ id: e._id.toString(), courseId: e.courseId }));
  }

  async findCourseEnrollments(courseId: string) {
    const list = await this.enrollmentModel.find({ courseId }).lean().exec();
    return list.map(e => ({ id: e._id.toString(), studentId: e.studentId, courseId: e.courseId }));
  }

  async dropCourse(studentId: string, courseId: string) {
    const deleted = await this.enrollmentModel.findOneAndDelete({ studentId, courseId }).exec();
    if (!deleted) throw new NotFoundException('درس مورد نظر در لیست انتخاب واحد شما یافت نشد');
    return { success: true };
  }
}
