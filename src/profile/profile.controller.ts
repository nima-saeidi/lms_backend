import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/profiles') // مسیر نهایی: /api/profiles
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  async getMyProfile(@Request() req) {
    const userId = req.user?.id || req.user?.userId || req.user?._id;
    return this.profileService.findByUserId(userId);
  }

  @Post()
  async createProfile(@Request() req, @Body() dto: CreateProfileDto) {
    const userId = req.user?.id || req.user?.userId || req.user?._id;
    dto.userId = userId; 
    return this.profileService.create(dto);
  }

  @Patch(':id') // به جای Put از Patch استفاده شد تا با فرانت‌اند هماهنگ باشد
  async updateProfile(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(id, dto);
  }
}
