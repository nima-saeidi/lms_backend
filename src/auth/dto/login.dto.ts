import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ali' })
  username: string;

  @ApiProperty({ example: 'secret123' })
  password: string;
}
