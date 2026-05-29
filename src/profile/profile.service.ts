import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

  async create(dto: CreateProfileDto) {
    const created = new this.profileModel(dto);
    await created.save();
    return created.toJSON();
  }

  async findAll() {
    return this.profileModel.find().populate('userId', 'username role').lean().exec();
  }

async findByUserId(userId: string) {
  // تبدیل به ObjectId را حذف کنید
  const profile = await this.profileModel.findOne({ userId: userId }).lean().exec();
  if (!profile) throw new NotFoundException('Profile not found');
  return profile;
}


  async update(id: string, dto: UpdateProfileDto) {
    const updated = await this.profileModel.findByIdAndUpdate(id, dto, { new: true }).lean().exec();
    if (!updated) throw new NotFoundException('Profile not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.profileModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) throw new NotFoundException('Profile not found');
    return deleted;
  }
}

