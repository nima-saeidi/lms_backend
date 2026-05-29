import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreatePaymentDto } from './dto/payment.dto';

@ApiTags('payments')
@Controller('api/payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles('student')
  async create(@GetUser('id') studentId: string, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(studentId, dto);
  }

  @Get('me')
  @Roles('student')
  async getMyPayments(@GetUser('id') studentId: string) {
    return this.paymentsService.findByStudent(studentId);
  }
}
