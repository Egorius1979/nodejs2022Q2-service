import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: CreateUserDto): Promise<Tokens> {
    const newUser = await this.usersService.create(body);
    const tokens = await this.getTokens(newUser.id, newUser.login);

    return tokens;
  }

  async signIn(body: CreateUserDto): Promise<Tokens> {
    const user = await this.usersService.findOne(body.login, body.password);

    const tokens = await this.getTokens(user.id, user.login);
    return tokens;
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const accessToken = this.jwtService.signAsync(
      { login, sub: userId },
      { expiresIn: 60 * 15, secret: process.env.AT_SECRET },
    );

    const refreshToken = this.jwtService.signAsync(
      { login, sub: userId },
      { expiresIn: 60 * 60 * 24 * 7, secret: process.env.RT_SECRET },
    );

    const [at, rt] = await Promise.all([accessToken, refreshToken]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async refresh(userId: string): Promise<Tokens> {
    const user = await this.usersService.getById(userId);
    const tokens = await this.getTokens(user.id, user.login);

    return tokens;
  }
}
