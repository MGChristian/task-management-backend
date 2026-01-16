import { ApiProperty } from '@nestjs/swagger';
import { GetProjectDto } from 'src/projects/dto/get-project.dto';
import { Project } from 'src/projects/entities/project.entity';
import { GetTaskDto } from 'src/tasks/dto/get-task.dto';
import { Task } from 'src/tasks/entities/task.entity';

export class GetUserDashboardDto {
  @ApiProperty({
    example: 10,
    description: 'Total number of completed projects for the user',
  })
  completedProjects: number;

  @ApiProperty({
    example: 5,
    description: 'Total number of pending projects for the user',
  })
  pendingProjects: number;

  @ApiProperty({
    example: 20,
    description: 'Total number of completed tasks for the user',
  })
  completedTasks: number;

  @ApiProperty({
    example: 8,
    description: 'Total number of pending tasks for the user',
  })
  pendingTasks: number;

  @ApiProperty({
    description: 'List of recently edited projects by the user',
    type: [GetProjectDto],
  })
  recentProjects: GetProjectDto[];

  @ApiProperty({
    description: 'List of recently edited tasks by the user',
    type: [GetTaskDto],
  })
  recentTasks: GetTaskDto[];
}
