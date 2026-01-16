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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetUserDashboardDto } from './dto/get-user-dashboard.dto';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get-user-dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully.',
    type: [GetUserDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'User dashboard data retrieved successfully.',
    type: GetUserDashboardDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('dashboard')
  getDashboard(@Req() req: Request) {
    const userId: number = req['user'].id;
    return this.usersService.getDashboard(userId);
  }
}
