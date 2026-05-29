// file: src/auth/auth.controller.ts
import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'ثبت‌نام کاربر (role= user)' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'توکن دسترسی', type: TokenDto })
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'ورود و دریافت توکن' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'توکن دسترسی', type: TokenDto })
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'پروفایل کاربر از روی توکن' })
  @ApiResponse({ status: 200, description: 'اطلاعات کاربر' })
  me(@GetUser() user: any) {
    return user;
  }
}
