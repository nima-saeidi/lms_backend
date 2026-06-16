import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('workflows')
@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد گردش‌کار توسط ادمین' })
  @ApiBody({ type: CreateWorkflowDto })
  @ApiResponse({
    status: 201,
    description: 'گردش‌کار ساخته شد',
  })
  create(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'لیست همه گردش‌کارها' })
  @ApiResponse({
    status: 200,
    description: 'لیست گردش‌کارها',
  })
  findAll() {
    return this.workflowsService.findAll();
  }

  @Get('type/:type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'teacher', 'student')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت گردش‌کار بر اساس نوع' })
  @ApiResponse({
    status: 200,
    description: 'اطلاعات گردش‌کار دریافتی',
  })
  findByType(@Param('type') type: string) {
    return this.workflowsService.findByType(type);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ویرایش گردش‌کار توسط ادمین' })
  @ApiResponse({ status: 200, description: 'گردش‌کار ویرایش شد' })
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateWorkflowDto>,
  ) {
    return this.workflowsService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف گردش‌کار توسط ادمین' })
  @ApiResponse({ status: 200, description: 'گردش‌کار حذف شد' })
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(id);
  }
}
