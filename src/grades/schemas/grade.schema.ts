// file: src/grades/schemas/grade.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type GradeDocument = Grade & Document;


@Schema({ timestamps: true })
export class Grade {
@Prop({ required: true })
studentId: string;


@Prop({ required: true })
courseId: string;


@Prop({ required: true, min: 0, max: 20 })
grade: number;
}


export const GradeSchema = SchemaFactory.createForClass(Grade);


GradeSchema.set('toJSON', {
transform: (_doc, ret) => {
ret.id = ret._id.toString();
delete ret._id;
delete ret.__v;
return ret;
},
});