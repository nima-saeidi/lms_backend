import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'ali' })
  username: string;

  @ApiProperty({ example: 'secret123', minLength: 6 })
  password: string;
}
