import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade, GradeDocument } from './schemas/grade.schema';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade.name) private gradeModel: Model<GradeDocument>) {}

  async create(dto: CreateGradeDto, user: any) {
    const created = new this.gradeModel(dto);
    await created.save();
    return created.toJSON();
  }

  // گرفتن همه نمرات (برای ادمین و معلم)
  async findAll(user: any, courseId?: string) {
    const query: any = {};
    
    // اگر بخواهید بر اساس کلاس خاصی فیلتر کنید
    if (courseId) {
      query.courseId = courseId;
    }

    // نکته: اگر کاربر معلم است، منطقاً فقط باید نمرات کلاس‌های خودش را ببیند.
    // در اینجا باید بررسی کنید که آیا معلم مالک courseId هست یا خیر.
    
    const list = await this.gradeModel.find(query).lean().exec();
    return list.map((g) => ({
      id: g._id.toString(),
      studentId: g.studentId,
      courseId: g.courseId,
      grade: g.grade,
    }));
  }

  // گرفتن نمرات دانشجو با تفکیک کلاس
  async findByStudent(studentId: string) {
    const list = await this.gradeModel.find({ studentId }).lean().exec();
    
    // دسته‌بندی نمرات بر اساس courseId (کلاس)
    const groupedGrades = list.reduce((acc, curr) => {
      const cId = curr.courseId as string;
      if (!acc[cId]) {
        acc[cId] = [];
      }
      acc[cId].push({
        id: curr._id.toString(),
        grade: curr.grade,
      });
      return acc;
    }, {} as Record<string, any[]>);

    return groupedGrades;
  }

  async findOne(id: string) {
    const g = await this.gradeModel.findById(id).lean().exec();
    if (!g) throw new NotFoundException('Grade not found');
    return { id: g._id.toString(), studentId: g.studentId, courseId: g.courseId, grade: g.grade };
  }

  async update(id: string, dto: UpdateGradeDto, user: any) {
    const grade = await this.gradeModel.findById(id).exec();
    if (!grade) throw new NotFoundException('Grade not found');
    Object.assign(grade, dto);
    await grade.save();
    return grade.toJSON();
  }

  async remove(id: string) {
    const result = await this.gradeModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Grade not found');
    return { success: true };
  }
}
