import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: CreateUserDto): Promise<Tokens> {
    const newUser = await this.usersService.create(body);
    const tokens = await this.getTokens(newUser.id, newUser.login);
    await this.usersService.updateRefresHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async signIn(body: CreateUserDto): Promise<Tokens> {
    const user = await this.usersService.findOne(body.login, body.password);

    const tokens = await this.getTokens(user.id, user.login);
    await this.usersService.updateRefresHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const accessToken = this.jwtService.signAsync(
      { login, sub: userId },
      { expiresIn: 60 * 15, secret: 'at-secret' },
    );

    const refreshToken = this.jwtService.signAsync(
      { login, sub: userId },
      { expiresIn: 60 * 60 * 24 * 7, secret: 'rt-secret' },
    );

    const [at, rt] = await Promise.all([accessToken, refreshToken]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async refresh(userId: string, rt: string): Promise<Tokens> {
    const user = await this.usersService.getById(userId);
    const isValidToken = await bcrypt.compare(rt, user.refHash);

    if (!isValidToken) throw new ForbiddenException();

    const tokens = await this.getTokens(user.id, user.login);
    await this.usersService.updateRefresHash(user.id, tokens.refreshToken);
    return tokens;
  }
}
