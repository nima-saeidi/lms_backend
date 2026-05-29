import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('api/enrollments') 
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @Roles('student')
  @UseGuards(RolesGuard)
  enroll(@Body('courseId') courseId: string, @Request() req) {
    const studentId = req.user.id || req.user.sub; 
    return this.enrollmentsService.enroll(studentId, courseId);
  }

  @Get('me')
  @Roles('student')
  @UseGuards(RolesGuard)
  findMyEnrollments(@Request() req) {
    const studentId = req.user.id || req.user.sub;
    return this.enrollmentsService.findMyEnrollments(studentId);
  }

  @Get('course/:courseId')
  @Roles('teacher', 'admin')
  @UseGuards(RolesGuard)
  findCourseEnrollments(@Param('courseId') courseId: string) {
    return this.enrollmentsService.findCourseEnrollments(courseId);
  }

  @Delete(':courseId')
  @Roles('student')
  @UseGuards(RolesGuard)
  dropCourse(@Param('courseId') courseId: string, @Request() req) {
    const studentId = req.user.id || req.user.sub;
    return this.enrollmentsService.dropCourse(studentId, courseId);
  }
}
