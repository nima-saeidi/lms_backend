import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestEntity } from './requests.schema';
import { WorkflowEntity } from '../workflows/workflows.schema';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(RequestEntity.name) private requestModel: Model<RequestEntity>,
    @InjectModel(WorkflowEntity.name) private workflowModel: Model<WorkflowEntity>,
  ) {}

  async create(studentId: string, dto: CreateRequestDto) {
    const workflow = await this.workflowModel.findOne({ type: dto.type });
    if (!workflow) throw new BadRequestException('هیچ گردش کاری برای این نوع درخواست تعریف نشده است');

    return this.requestModel.create({
      studentId,
      ...dto,
      workflowId: workflow._id,
      currentStep: workflow.initialStep,
      status: 'in_progress'
    });
  }

  async findAll() {
    // بازگرداندن همه درخواست‌ها به همراه اطلاعات نام و نام خانوادگی دانشجو
    return this.requestModel.find().populate('studentId', 'firstName lastName').exec();
  }

  async findMyRequests(studentId: string) {
    // بازگرداندن درخواست‌های یک دانشجوی خاص
    return this.requestModel.find({ studentId }).exec();
  }

  async processRequest(id: string, userRole: string, action: 'approve' | 'reject') {
    const req = await this.requestModel.findById(id);
    if (!req) throw new NotFoundException('درخواست یافت نشد');
    if (req.status !== 'in_progress') throw new BadRequestException('این درخواست قبلا بسته شده است');

    const workflow = await this.workflowModel.findById(req.workflowId);
    
    const currentStepConfig = workflow.steps.find(s => s.stepName === req.currentStep);
    
    if (currentStepConfig.requiredRole !== userRole) {
      throw new ForbiddenException('شما دسترسی لازم برای تغییر وضعیت این مرحله را ندارید');
    }

    const nextStepName = action === 'approve' ? currentStepConfig.onApprove : currentStepConfig.onReject;

    if (nextStepName === 'completed' || nextStepName === 'rejected') {
      req.status = nextStepName;
      req.currentStep = 'done';
    } else {
      req.currentStep = nextStepName;
    }

    return req.save();
  }
}
