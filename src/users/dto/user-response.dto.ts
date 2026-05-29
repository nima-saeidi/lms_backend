import { ApiProperty } from '@nestjs/swagger';


export class UserResponseDto {
@ApiProperty({ example: '64f8f1aab3e...' })
id: string;


@ApiProperty({ example: 'ali' })
username: string;


@ApiProperty({ example: 'user' })
role: string;
}