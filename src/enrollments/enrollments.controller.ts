import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
// فرض بر این است که گارد احراز هویت دارید

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  // ثبت‌نام (دانشجو)
  @Post()
  create(@Req() req: any, @Body() dto: CreateEnrollmentDto) {
    const studentId = req.user.id; // گرفتن آیدی از توکن
    return this.enrollmentsService.create(studentId, dto);
  }

  // لیست انتخاب واحدهای خودم (دانشجو)
  @Get('me')
  findMyEnrollments(@Req() req: any) {
    const studentId = req.user.id;
    return this.enrollmentsService.findMyEnrollments(studentId);
  }

  // لیست کل انتخاب واحدها (ادمین)
  // @Roles('ADMIN') -> در صورت داشتن گارد نقش‌ها
  @Get()
  findAll() {
    return this.enrollmentsService.findAllEnrollments();
  }

  // حذف درس (دانشجو)
  @Delete(':courseId')
  remove(@Req() req: any, @Param('courseId') courseId: string) {
    const studentId = req.user.id;
    return this.enrollmentsService.remove(studentId, courseId);
  }
}
