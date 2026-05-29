import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async create(dto: any) {
    const created = new this.courseModel(dto);
    await created.save();
    return { id: created._id.toString(), ...created.toJSON() };
  }

  async findAll(user: any) {
    const query: any = {};

    if (user && user.role === 'teacher') {
      query.teacherId = user.id || user.userId || user._id; 
    }

    const courses = await this.courseModel.find(query).lean().exec();
    return courses.map(c => ({ id: c._id.toString(), ...c }));
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id).lean().exec();
    if (!course) throw new NotFoundException('Course not found');
    return { id: course._id.toString(), ...course };
  }

  async update(id: string, dto: any) {
    const course = await this.courseModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!course) throw new NotFoundException('Course not found');
    return { id: course._id.toString(), ...course.toJSON() };
  }

  async remove(id: string) {
    const course = await this.courseModel.findByIdAndDelete(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return { success: true, id };
  }
}
