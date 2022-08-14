import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { Request } from 'express';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() body: CreateUserDto): Promise<Tokens> {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('login')
  signIn(@Body() body: CreateUserDto): Promise<Tokens> {
    return this.authService.signIn(body);
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  refresh(@Req() req: Request) {
    const user = req.user;
    return this.authService.refresh(user['sub']);
  }
}
