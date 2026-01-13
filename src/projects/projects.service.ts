import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}
  create(userId: number, createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create({
      ...createProjectDto,
      user: { id: userId },
    });
    return this.projectRepository.save(newProject);
  }

  async findAll(userId: number) {
    return this.projectRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        deadline: true,
        isCompleted: true,
        user: { id: true, name: true, email: true },
      },
      relations: {
        user: true,
      },
      where: { user: { id: userId } },
    });
  }

  async findAllAssigned(userId: number) {
    return this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.user', 'user')
      .leftJoinAndSelect('project.tasks', 'task')
      .where('task.userId = :userId', { userId })
      .getMany();
  }

  findOne(userId: number, id: number) {
    return this.projectRepository.findOne({
      select: {
        id: true,
        name: true,
        description: true,
        deadline: true,
        isCompleted: true,
        user: { id: true, name: true, email: true },
      },
      relations: {
        user: true,
      },
      where: { user: { id: userId } },
    });
  }

  update(userId: number, id: number, updateProjectDto: UpdateProjectDto) {
    const updateProject = this.projectRepository.update(
      {
        id,
      },
      {
        ...updateProjectDto,
        user: { id: userId },
      },
    );
    return updateProject;
  }

  remove(userId: number, id: number) {
    return this.projectRepository.delete({ id, user: { id: userId } });
  }
}
