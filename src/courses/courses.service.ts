import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';


@Injectable()
export class CoursesService {
constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}


async create(dto: CreateCourseDto) {
const created = new this.courseModel(dto);
await created.save();
return created.toJSON();
}


async findAll() {
const courses = await this.courseModel.find().lean().exec();
return courses.map((c) => ({ id: c._id.toString(), title: c.title, code: c.code, teacherId: c.teacherId, units: c.units }));
}


async findOne(id: string) {
const course = await this.courseModel.findById(id).lean().exec();
if (!course) throw new NotFoundException('Course not found');
return { id: course._id.toString(), title: course.title, code: course.code, teacherId: course.teacherId, units: course.units };
}


async update(id: string, dto: UpdateCourseDto, user: any) {
const course = await this.courseModel.findById(id).exec();
if (!course) throw new NotFoundException('Course not found');
if (user.role !== 'admin' && !(user.role === 'teacher' && user.id === course.teacherId)) {
throw new ForbiddenException('You are not allowed to update this course');
}
Object.assign(course, dto);
await course.save();
return course.toJSON();
}


async remove(id: string) {
const result = await this.courseModel.findByIdAndDelete(id).exec();
if (!result) throw new NotFoundException('Course not found');
return { success: true };
}
}