import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from 'src/users/dto/get-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; user: GetUserDto }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const { password: _, ...userWithoutPassword } = user;
    return { accessToken, user: userWithoutPassword };
  }

  async signUp(
    email: string,
    name: string,
    password: string,
  ): Promise<{ accessToken: string; user: GetUserDto }> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({
      email,
      name,
      password: hashedPassword,
    });
    const payload = { id: newUser.id, email: newUser.email };
    const accessToken = this.jwtService.sign(payload);
    const { password: _, ...userWithoutPassword } = newUser;

    return { accessToken, user: userWithoutPassword };
  }
}
