import { ApiProperty } from '@nestjs/swagger';
import { GetTaskDto } from 'src/tasks/dto/get-task.dto';

export class GetProjectDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the project',
  })
  id: number;

  @ApiProperty({
    example: 'Project Name',
    description: 'The name of the project',
  })
  name: string;
  @ApiProperty({
    example: 'This is a sample project description.',
    description: 'The description of the project',
  })
  description?: string;

  @ApiProperty({
    example: '2024-12-31 23:59:59',
    description: 'The deadline of the project',
  })
  deadline: Date;

  @ApiProperty({
    example: false,
    description: 'The completion status of the project',
  })
  isCompleted?: boolean;
}
