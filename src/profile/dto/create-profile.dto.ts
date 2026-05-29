import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty({ example: 'Ali', description: 'نام کاربر' })
  firstName: string;

  @ApiProperty({ example: 'Ahmadi', description: 'نام خانوادگی' })
  lastName: string;

  @ApiProperty({ example: 'ali@example.com', description: 'ایمیل کاربر' })
  email: string;

  @ApiProperty({ example: '09123456789', description: 'شماره تماس کاربر' })
  phone: string;

  @ApiProperty({ example: '64f8f1aab3e...', description: 'شناسه کاربر' })
  userId: string;
}
