import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty({ example: '64f8f1aab3e...' })
  id: string;

  @ApiProperty({ example: 'Ali' })
  firstName: string;

  @ApiProperty({ example: 'Ahmadi' })
  lastName: string;

  @ApiProperty({ example: 'ali@example.com' })
  email: string;

  @ApiProperty({ example: '09123456789' })
  phone: string;

  @ApiProperty({ example: '64f8f1aab3e...', description: 'شناسه کاربر' })
  userId: string;
}
