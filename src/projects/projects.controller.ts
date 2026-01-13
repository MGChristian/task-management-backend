import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetProjectDto } from './dto/get-project.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { GetTaskDto } from 'src/tasks/dto/get-task.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Project created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  create(
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ) {
    const userId: number = req['user'].id;
    return this.projectsService.create(userId, createProjectDto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of projects retrieved successfully.',
    type: [GetProjectDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll(@Req() req: Request) {
    const userId: number = req['user'].id;
    return this.projectsService.findAll(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'List of assigned projects retrieved successfully.',
    type: [GetProjectDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('assigned')
  findAllAssigned(@Req() req: Request) {
    const userId: number = req['user'].id;
    return this.projectsService.findAllAssigned(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'Project retrieved successfully.',
    type: GetProjectDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userId: number = req['user'].id;
    return this.projectsService.findOne(userId, id);
  }

  @ApiResponse({
    status: 200,
    description: 'List of tasks for the project retrieved successfully.',
    type: [GetTaskDto],
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('/:id/tasks')
  findTasksByProject(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findAllByProject(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Project updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateProjectDto: UpdateProjectDto,
    @Req() req: Request,
  ) {
    const userId: number = req['user'].id;
    return this.projectsService.update(userId, id, updateProjectDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userId: number = req['user'].id;
    return this.projectsService.remove(userId, id);
  }
}
