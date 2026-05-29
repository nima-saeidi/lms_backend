import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';


@ApiTags('courses')
@Controller('api/courses')
export class CoursesController {
constructor(private readonly coursesService: CoursesService) {}


@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('teacher', 'admin')
@ApiBearerAuth()
@ApiOperation({ summary: 'ایجاد درس جدید' })
@ApiBody({ type: CreateCourseDto })
@ApiResponse({ status: 201, description: 'درس ایجاد شد', type: CourseResponseDto })
create(@Body() dto: CreateCourseDto) {
return this.coursesService.create(dto);
}


@Get()
@ApiOperation({ summary: 'فهرست دروس' })
@ApiResponse({ status: 200, description: 'لیست دروس', type: [CourseResponseDto] })
findAll() {
return this.coursesService.findAll();
}


@Get(':id')
@ApiOperation({ summary: 'جزئیات یک درس' })
@ApiResponse({ status: 200, description: 'جزئیات درس', type: CourseResponseDto })
findOne(@Param('id') id: string) {
return this.coursesService.findOne(id);
}


@Patch(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('teacher', 'admin')
@ApiBearerAuth()
@ApiOperation({ summary: 'بروزرسانی درس' })
@ApiBody({ type: UpdateCourseDto })
@ApiResponse({ status: 200, description: 'درس بروزرسانی شد', type: CourseResponseDto })
update(@Param('id') id: string, @Body() dto: UpdateCourseDto, @GetUser() user: any) {
return this.coursesService.update(id, dto, user);
}


@Delete(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
@ApiOperation({ summary: 'حذف درس' })
@ApiResponse({ status: 200, description: 'درس حذف شد', schema: { example: { success: true } } })
remove(@Param('id') id: string) {
return this.coursesService.remove(id);
}
}
