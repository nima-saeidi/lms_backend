// requests/dto/create-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';


export class CreateRequestDto {
@ApiProperty()
type: string;


@ApiProperty({ required: false })
note?: string;
}