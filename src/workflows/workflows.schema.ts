import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class WorkflowStep {
  @Prop({ required: true })
  stepName: string; 

  @Prop({ required: true })
  requiredRole: string;

  @Prop({ required: true })
  onApprove: string; 

  @Prop({ required: true })
  onReject: string; 
}

@Schema({ timestamps: true })
export class WorkflowEntity extends Document {
  @Prop({ required: true, unique: true })
  type: string; 

  @Prop({ required: true })
  initialStep: string; 

  @Prop({ type: [WorkflowStep], required: true })
  steps: WorkflowStep[];
}

export const WorkflowSchema = SchemaFactory.createForClass(WorkflowEntity);
