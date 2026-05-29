import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileResponseDto } from './dto/profile-response.dto';

@ApiTags('profiles')
@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد پروفایل جدید' })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت لیست همه پروفایل‌ها (ادمین)' })
  findAll() {
    return this.profileService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت پروفایل کاربر لاگین شده' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  findMyProfile(@Request() req: any) {
    const currentUserId = req.user.id || req.user.userId || req.user.sub;
    return this.profileService.findByUserId(currentUserId);
  }


  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت پروفایل یک کاربر خاص' })
  findByUserId(@Param('userId') userId: string) {
    return this.profileService.findByUserId(userId);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ویرایش پروفایل' })
  update(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(userId, updateProfileDto);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف پروفایل' })
  remove(@Param('userId') userId: string) {
    return this.profileService.remove(userId);
  }
}
