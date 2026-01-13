import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    example: { token: 'jwt-token-string' },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @Post('login')
  login(@Body(new ValidationPipe()) body: LoginDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'User signed up successfully.' })
  @ApiResponse({ status: 409, description: 'Email already in use.' })
  @Post('signup')
  async signup(@Body(new ValidationPipe()) body: SignupDto) {
    const newUser = await this.authService.signUp(
      body.email,
      body.name,
      body.password,
    );
    const { password, ...result } = newUser;
    return result;
  }
}
