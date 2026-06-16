import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkflowEntity } from './workflows.schema';

@Injectable()
export class WorkflowSeederService implements OnModuleInit {
  constructor(
    @InjectModel(WorkflowEntity.name) private workflowModel: Model<WorkflowEntity>,
  ) {}

  async onModuleInit() {
    await this.seedWorkflows();
  }

  private async seedWorkflows() {
    const workflows = [
      // ۱. گردش کار: درخواست کارمند به ادمین
      {
        type: 'EMPLOYEE_LEAVE_REQUEST', // یا هر نوع درخواست دیگر
        initialStep: 'PENDING_ADMIN_APPROVAL',
        steps: [
          {
            stepName: 'PENDING_ADMIN_APPROVAL',
            requiredRole: 'admin', // فقط ادمین می‌تواند این مرحله را تایید/رد کند
            onApprove: 'APPROVED',
            onReject: 'REJECTED',
          },
        ],
      },

      // ۲. گردش کار: درخواست دانشجو به استاد (مثلاً درخواست تجدید نظر نمره)
      {
        type: 'STUDENT_TO_TEACHER_REQUEST',
        initialStep: 'PENDING_TEACHER_APPROVAL',
        steps: [
          {
            stepName: 'PENDING_TEACHER_APPROVAL',
            requiredRole: 'teacher', // فقط استاد
            onApprove: 'APPROVED',
            onReject: 'REJECTED',
          },
        ],
      },

      // ۳. گردش کار: درخواست دانشجو به ادمین (مثلاً درخواست گواهی اشتغال به تحصیل)
      {
        type: 'STUDENT_TO_ADMIN_REQUEST',
        initialStep: 'PENDING_ADMIN_APPROVAL',
        steps: [
          {
            stepName: 'PENDING_ADMIN_APPROVAL',
            requiredRole: 'admin', // فقط ادمین
            onApprove: 'APPROVED',
            onReject: 'REJECTED',
          },
        ],
      },

      // ۴. (اختیاری) گردش کار دو مرحله‌ای: اول تایید استاد، سپس تایید ادمین
      {
        type: 'STUDENT_COURSE_DROP_REQUEST', // حذف اضطراری
        initialStep: 'PENDING_TEACHER_APPROVAL',
        steps: [
          {
            stepName: 'PENDING_TEACHER_APPROVAL',
            requiredRole: 'teacher',
            onApprove: 'PENDING_ADMIN_APPROVAL', // در صورت تایید استاد، می‌رود برای ادمین
            onReject: 'REJECTED', // استاد رد کند کلا رد می‌شود
          },
          {
            stepName: 'PENDING_ADMIN_APPROVAL',
            requiredRole: 'admin',
            onApprove: 'APPROVED', // ادمین تایید کند نهایی می‌شود
            onReject: 'REJECTED',
          },
        ],
      },
    ];

    for (const wf of workflows) {
      const exists = await this.workflowModel.findOne({ type: wf.type });
      if (!exists) {
        await this.workflowModel.create(wf);
        console.log(`Workflow ${wf.type} created.`);
      }
    }
  }
}
