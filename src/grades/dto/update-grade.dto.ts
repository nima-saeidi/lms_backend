// file: src/grades/dto/update-grade.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateGradeDto } from './create-grade.dto';
export class UpdateGradeDto extends PartialType(CreateGradeDto) {}