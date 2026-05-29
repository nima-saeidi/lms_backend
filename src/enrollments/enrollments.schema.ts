import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  courseId: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
