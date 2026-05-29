import { Controller, Post, Get, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Roles } from '../auth/roles.decorator';

@ApiTags('requests')
@ApiBearerAuth()
@Controller('requests')
export class RequestsController {
  constructor(private service: RequestsService) {}

  @Post()
  @Roles('student')
  create(@Request() req, @Body() dto: CreateRequestDto) {
    return this.service.create(req.user.userId, dto);
  }

  @Post(':id/process')
  @ApiOperation({ summary: 'Process a workflow step (Approve/Reject)' })
  processStep(
    @Request() req,
    @Param('id') id: string,
    @Body() actionDto: { action: 'approve' | 'reject' }
  ) {
    return this.service.processRequest(id, req.user.role, actionDto.action);
  }
}
