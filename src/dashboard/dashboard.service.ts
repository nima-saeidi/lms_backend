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
    const [students, teachers, courses] =
      await Promise.all([
        this.userModel.countDocuments({ role: 'student' }),
        this.userModel.countDocuments({ role: 'teacher' }),
        this.courseModel.find().lean(),
      ]);

    return {
      stats: { students, teachers },
      courses,
    };
  }

  private async getStudentDashboard(studentId: string) {
    const [courses] = await Promise.all([
      this.courseModel.find({ students: studentId }).lean(),
    ]);

    return {
      courses
    };
  }
}
