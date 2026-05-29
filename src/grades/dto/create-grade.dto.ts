import { ApiProperty } from '@nestjs/swagger'

export class CreateGradeDto {
@ApiProperty()
studentId: string;


@ApiProperty()
courseId: string;


@ApiProperty({ minimum: 0, maximum: 20 })
grade: number;
}