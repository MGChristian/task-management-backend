import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUserDashboardDto } from './dto/get-user-dashboard.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly projectsService: ProjectsService,
    private readonly tasksRepository: TasksService,
  ) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async getDashboard(userId: number): Promise<GetUserDashboardDto> {
    const projects = await this.projectsService.findAll();
    const tasks = await this.tasksRepository.findAllAssigned(userId);
    return {
      completedProjects: projects.filter((project) => project.isCompleted)
        .length,
      pendingProjects: projects.filter((project) => !project.isCompleted)
        .length,
      completedTasks: tasks.filter((task) => task.status === 'COMPLETED')
        .length,
      pendingTasks: tasks.filter((task) => task.status !== 'COMPLETED').length,
      recentProjects: projects.slice(0, 5),
      recentTasks: tasks.slice(0, 5),
    };
  }
}
