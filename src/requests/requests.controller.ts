import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // مسیر ایمپورت ممکن است بر اساس ساختار شما متفاوت باشد
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('requests')
export class RequestsController {
  constructor(private service: RequestsService) {}

  @Post()
  @Roles('student')
  create(@Request() req, @Body() dto: CreateRequestDto) {
    return this.service.create(req.user.userId, dto);
  }

  @Get()
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Get all requests (Admin/Teacher)' })
  findAll() {
    return this.service.findAll();
  }

  @Get('me')
  @Roles('student')
  @ApiOperation({ summary: 'Get current student requests' })
  findMyRequests(@Request() req) {
    return this.service.findMyRequests(req.user.userId);
  }

  @Post(':id/process')
  @Roles('admin', 'teacher')
  @ApiOperation({ summary: 'Process a workflow step (Approve/Reject)' })
  processStep(
    @Request() req,
    @Param('id') id: string,
    @Body() actionDto: { action: 'approve' | 'reject' },
  ) {
    return this.service.processRequest(id, req.user.role, actionDto.action);
  }
}
