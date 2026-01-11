import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const newUser = await this.authService.signUp(body.email, body.password);
    const { password, ...result } = newUser;
    return result;
  }
}
