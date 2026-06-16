import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GradesService } from './grades.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('api/grades')
@UseGuards(JwtAuthGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('teacher', 'admin')
  create(@Body() dto: any) {
    return this.gradesService.create(dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'teacher')
  findAll(@Query('courseId') courseId?: string) {
    return this.gradesService.findAll(courseId);
  }

  @Get('me')
  @UseGuards(RolesGuard)
  @Roles('student')
  findMyGrades(@GetUser('id') studentId: string) {
    return this.gradesService.findByStudent(studentId);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('teacher', 'admin')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.gradesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.gradesService.remove(id);
  }
}
