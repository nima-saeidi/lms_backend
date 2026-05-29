import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
@ApiProperty({ example: 'ali' })
username: string;


@ApiProperty({ example: 'secret123', minLength: 6 })
password: string;


@ApiProperty({ example: 'user', enum: ['user', 'admin'] })
role: 'user' | 'admin';
}