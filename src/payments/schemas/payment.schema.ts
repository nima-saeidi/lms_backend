import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'pending' })
  status: string; 
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

PaymentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
