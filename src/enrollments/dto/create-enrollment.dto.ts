// enrollments/dto/create-enrollment.dto.ts
import { ApiProperty } from '@nestjs/swagger';


export class CreateEnrollmentDto {
@ApiProperty()
courseId: string;
}