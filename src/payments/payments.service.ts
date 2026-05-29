import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private payModel: Model<PaymentDocument>) {}

  async create(studentId: string, dto: CreatePaymentDto) {
    const created = new this.payModel({ studentId, amount: dto.amount, status: 'pending' });
    return created.save();
  }

  async findByStudent(studentId: string) {
    return this.payModel.find({ studentId }).sort({ createdAt: -1 }).lean();
  }
}
