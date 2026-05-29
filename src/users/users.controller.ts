import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'اطلاعات کاربر جاری' })
  @ApiResponse({
    status: 200,
    description: 'اطلاعات کاربر جاری',
    type: UserResponseDto,
  })
  getMe(@GetUser() user: any): UserResponseDto {
    return {
      id: user._id?.toString() || user.id,
      username: user.username,
      role: user.role,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'لیست همه کاربران (بدون پسورد)' })
  @ApiResponse({
    status: 200,
    description: 'لیست کاربران',
    type: [UserResponseDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد کاربر توسط ادمین' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'کاربر ساخته شد',
    type: UserResponseDto,
  })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // روت جدید: تغییر نقش
  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'تغییر نقش کاربر توسط ادمین' })
  @ApiBody({
    schema: { properties: { role: { type: 'string', example: 'teacher' } } },
  })
  @ApiResponse({ status: 200, description: 'نقش کاربر تغییر کرد' })
  updateRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.updateRole(id, role);
  }

  // روت جدید: حذف کاربر
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف کاربر توسط ادمین' })
  @ApiResponse({ status: 200, description: 'کاربر حذف شد' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
