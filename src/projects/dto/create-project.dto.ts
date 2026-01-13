import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the project',
    example: 'New Website Launch',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the project',
    example: 'This project involves launching a new company website.',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Deadline for the project',
    example: '2024-12-31T23:59:59Z',
  })
  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({
    description: 'Completion status of the project',
    example: false,
    required: false,
  })
  isCompleted?: boolean;
}
