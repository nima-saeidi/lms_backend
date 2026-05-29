import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  /** ثبت‌نام عمومی: role همیشه 'user' */
  async register(dto: RegisterDto) {
    const exist = await this.usersService.findByUsername(dto.username);
    if (exist) throw new BadRequestException('username already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    // ساخت یوزر با role = user
    const created = await this.usersService['userModel'].create({
      username: dto.username,
      password: hashed,
      role: 'user',
    });

    return this.signToken(created._id.toString(), created.username, created.role);
  }

  /** لاگین و دریافت توکن */
  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsername(dto.username);
    if (!user) throw new UnauthorizedException('invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('invalid credentials');

    return this.signToken(user._id.toString(), user.username, user.role);
  }

  /** ساخت Access Token */
  private async signToken(sub: string, username: string, role: string) {
    const payload = { sub, username, role };
    const access_token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
    return { access_token };
  }
}
