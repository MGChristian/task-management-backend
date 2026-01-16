import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: createTaskDto.userId },
      project: { id: createTaskDto.projectId },
    });
    return this.tasksRepository.save(newTask);
  }

  findAllAssigned(userId: number) {
    return this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.userId = :userId', { userId })
      .getMany();
  }

  findAll(projectId?: number) {
    return this.tasksRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        user: { id: true, name: true, email: true },
        project: { id: true, name: true },
      },
      where: projectId ? { project: { id: projectId } } : {},
      relations: {
        user: true,
        project: true,
      },
    });
  }

  findAllByProject(projectId: number) {
    return this.tasksRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        user: { id: true, name: true, email: true },
      },
      relations: {
        user: true,
      },
      where: { project: { id: projectId } },
    });
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        user: { id: true, name: true, email: true },
        project: { id: true, name: true },
      },
      where: { id },
      relations: {
        user: true,
        project: true,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const { userId, projectId, ...updateData } = updateTaskDto;

    const userIdToUpdate = userId ?? null;
    const projectIdToUpdate = projectId ?? null;

    return this.tasksRepository.update(
      { id },
      {
        ...updateData,
        ...(userIdToUpdate !== null ? { user: { id: userIdToUpdate } } : {}),
        ...(projectIdToUpdate !== null
          ? { project: { id: projectIdToUpdate } }
          : {}),
      },
    );
  }

  remove(id: number) {
    return this.tasksRepository.delete({ id });
  }
}
