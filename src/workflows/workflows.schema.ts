// workflows/workflows.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class WorkflowStep {
  @Prop({ required: true })
  stepName: string; // نام مرحله (مثلا: 'manager_approval')

  @Prop({ required: true })
  requiredRole: string; // چه نقشی می‌تواند این مرحله را بررسی کند (مثلا: 'manager')

  @Prop({ required: true })
  onApprove: string; // نام مرحله بعدی در صورت تایید (یا 'completed')

  @Prop({ required: true })
  onReject: string; // نام مرحله بعدی در صورت رد شدن (یا 'rejected')
}

@Schema({ timestamps: true })
export class WorkflowEntity extends Document {
  @Prop({ required: true, unique: true })
  type: string; // نوع درخواست مرتبط (مثلا: 'leave')

  @Prop({ required: true })
  initialStep: string; // اولین مرحله پس از ثبت درخواست

  @Prop({ type: [WorkflowStep], required: true })
  steps: WorkflowStep[];
}

export const WorkflowSchema = SchemaFactory.createForClass(WorkflowEntity);
