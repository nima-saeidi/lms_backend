import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WorkflowEntity } from '../workflows/workflows.schema';

@Schema({ timestamps: true })
export class RequestEntity extends Document {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  type: string; 

  @Prop({ type: Types.ObjectId, ref: 'WorkflowEntity' })
  workflowId: Types.ObjectId;

  @Prop({ required: true })
  currentStep: string; 

  @Prop({ default: 'in_progress' })
  status: string;

  @Prop()
  note: string;
}

export const RequestSchema = SchemaFactory.createForClass(RequestEntity);
