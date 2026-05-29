import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/courses/schemas/course.schema';
import { User } from 'src/users/schemas/user.schema';


@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Request.name) private requestModel: Model<Request>,
  ) {}

  async getDashboard(user: any) {
    if (user.role === 'admin') {
      return this.getAdminDashboard();
    }
    if (user.role === 'student') {
      return this.getStudentDashboard(user.id);
    }
    return { message: 'نقش ناشناخته' };
  }

  private async getAdminDashboard() {
    const [students, teachers, courses, requests] =
      await Promise.all([
        this.userModel.countDocuments({ role: 'student' }),
        this.userModel.countDocuments({ role: 'teacher' }),
        this.courseModel.find().lean(),
        this.requestModel.find().sort({ createdAt: -1 }).limit(10).lean(),
      ]);

    return {
      stats: { students, teachers },
      courses,
      requests,
    };
  }

  private async getStudentDashboard(studentId: string) {
    const [courses, requests] = await Promise.all([
      this.courseModel.find({ students: studentId }).lean(),
      this.requestModel.find({ studentId }).sort({ createdAt: -1 }).lean(),
    ]);

    return {
      courses,
      requests,
    };
  }
}
