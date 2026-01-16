import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetTaskDto } from './dto/get-task.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({
    status: 201,
    description: 'Task created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  create(@Body(new ValidationPipe()) createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of tasks retrieved successfully.',
    type: [GetTaskDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'List of assigned tasks retrieved successfully.',
    type: [GetTaskDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('assigned')
  findAllAssigned(@Req() req: Request) {
    const userId: number = req['user'].id;
    return this.tasksService.findAllAssigned(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'Task retrieved successfully.',
    type: GetTaskDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Task updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Task deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
