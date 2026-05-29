// enrollments/enrollments.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Enrollment extends Document {
@Prop({ required: true })
studentId: string;


@Prop({ required: true })
courseId: string;
}


export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);


