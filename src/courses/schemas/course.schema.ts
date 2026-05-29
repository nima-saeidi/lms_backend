import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  teacherId: string;

  @Prop({ required: true })
  units: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});