import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Get,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
// import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt-auth.guard';
import { Tokens } from './types';
import { Request } from 'express';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))

  // async signUp(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Public()
  @Post('signup')
  signUp(@Body() body: CreateUserDto): Promise<Tokens> {
    return this.authService.signUp(body);
  }

  // @UseGuards(AuthGuard('local'))

  @Public()
  @Post('login')
  signIn(@Body() body: CreateUserDto): Promise<Tokens> {
    return this.authService.signIn(body);
  }

  // @UseGuards(AuthGuard('jwt-refresh'))
  // @Post('refresh')
  // refresh(@Req() req: Request) {
  //   const user = req.user;
  //   return this.authService.refresh(user['sub'], user['refreshToken']);
  // }
}
