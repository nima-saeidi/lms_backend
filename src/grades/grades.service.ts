import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade, GradeDocument } from './schemas/grade.schema';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private gradeModel: Model<GradeDocument>) {}

  async create(dto: any) {
    const exists = await this.gradeModel.findOne({ studentId: dto.studentId, courseId: dto.courseId });
    if (exists) {
      throw new BadRequestException('نمره این دانشجو در این درس قبلاً ثبت شده است. از ویرایش استفاده کنید.');
    }

    const created = new this.gradeModel(dto);
    await created.save();
    return { id: created._id.toString(), ...created.toJSON() };
  }

  async findAll(courseId?: string) {
    const query = courseId ? { courseId } : {};
    const list = await this.gradeModel.find(query).lean().exec();
    return list.map((g) => ({
      id: g._id.toString(),
      studentId: g.studentId,
      courseId: g.courseId,
      grade: g.grade,
    }));
  }

  async findByStudent(studentId: string) {
    const list = await this.gradeModel.find({ studentId }).lean().exec();
    return list.map(g => ({
      id: g._id.toString(),
      courseId: g.courseId,
      grade: g.grade
    }));
  }

  async update(id: string, dto: any) {
    const grade = await this.gradeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!grade) throw new NotFoundException('نمره یافت نشد');
    return { id: grade._id.toString(), ...grade.toJSON() };
  }

  async remove(id: string) {
    const result = await this.gradeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('نمره یافت نشد');
    return { success: true };
  }
}
