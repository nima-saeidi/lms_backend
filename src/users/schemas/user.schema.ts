import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserDocument = User & Document;


@Schema({ timestamps: true })
export class User {
@Prop({ required: true, unique: true })
username: string;


@Prop({ required: true })
password: string;


@Prop({ required: true, default: 'user' })
role: string;  
}


export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.set('toJSON', {
transform: (doc, ret) => {
ret.id = ret._id?.toString();
delete ret._id;
delete ret.password;
delete ret.__v;
return ret;
},
});