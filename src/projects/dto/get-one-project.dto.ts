import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/tasks/entities/task.entity';

export class GetOneProjectDto {
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

  @ApiProperty({
    example: {
      id: 1,
      name: 'User Name',
      email: 'user@example.com',
    },
    description: 'The user associated with the project',
  })
  user: {
    id: number;
    name: string;
    email: string;
  };

  @ApiProperty({
    example: [
      {
        id: 1,
        title: 'Task Title',
        description: 'This is a sample task description.',
        status: 'IN_PROGRESS',
        createdAt: '2024-01-01 12:00:00',
      },
    ],
    description: 'The tasks associated with the project',
  })
  tasks: Task[];

  @ApiProperty({
    example: '2024-01-01 12:00:00',
    description: 'The creation date of the project',
  })
  createdAt: Date;
}
