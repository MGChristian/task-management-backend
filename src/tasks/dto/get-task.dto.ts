import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../enums/tasks-status.enum';

export class GetTaskDto {
  @ApiProperty({
    example: 'Task Title',
    description: 'The title of the task',
  })
  id: number;

  @ApiProperty({
    example: 'Task Title',
    description: 'The title of the task',
  })
  title: string;

  @ApiProperty({
    example: 'This is a sample task description.',
    description: 'The description of the task',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'IN_PROGRESS',
    description: 'The status of the task',
    required: false,
  })
  status?: TaskStatus;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user associated with the task',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the project associated with the task',
  })
  projectId: number;
}
