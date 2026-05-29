
import { ApiProperty } from '@nestjs/swagger';


export class CourseResponseDto {
@ApiProperty({ example: '64f8f1aab3e...' })
id: string;


@ApiProperty({ example: 'Data Structures' })
title: string;


@ApiProperty({ example: 'CS101' })
code: string;


@ApiProperty({ example: '64f8f1aab3e...' })
teacherId: string;


@ApiProperty({ example: 3 })
units: number;
}