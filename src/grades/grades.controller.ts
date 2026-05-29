import { Controller, Post, Get, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('grades')
@Controller('api/grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiBody({ type: CreateGradeDto })
  @ApiOperation({ summary: 'Create a grade for a student' })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateGradeDto, @GetUser() user: any) {
    return this.gradesService.create(dto, user);
  }

  // --- مسیر جدید برای ادمین و معلم ---
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all grades (Admin/Teacher)' })
  @ApiQuery({ name: 'courseId', required: false, description: 'Filter by Course/Class ID' })
  @ApiResponse({ status: 200 })
  findAll(@GetUser() user: any, @Query('courseId') courseId?: string) {
    return this.gradesService.findAll(user, courseId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current student grades grouped by class' })
  @ApiResponse({ status: 200 })
  findMyGrades(@GetUser('id') studentId: string) {
    return this.gradesService.findByStudent(studentId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher', 'admin')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateGradeDto })
  @ApiOperation({ summary: 'Update grade' })
  update(@Param('id') id: string, @Body() dto: UpdateGradeDto, @GetUser() user: any) {
    return this.gradesService.update(id, dto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete grade' })
  remove(@Param('id') id: string) {
    return this.gradesService.remove(id);
  }
}
