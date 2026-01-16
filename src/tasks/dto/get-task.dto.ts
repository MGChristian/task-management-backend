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
    example: {
      id: 1,
      email: 'user@example.com',
      name: 'User Name',
    },
    description: 'The ID of the user associated with the task',
  })
  user: {
    id: number;
    email: string;
    name: string;
  };

  @ApiProperty({
    example: {
      id: 1,
      name: 'Project Name',
    },
    description: 'The ID of the project associated with the task',
  })
  project: {
    id: number;
    name: string;
  };

  @ApiProperty({
    example: '2024-01-01 12:00:00',
    description: 'The creation date of the task',
  })
  createdAt: Date;
}
