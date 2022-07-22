import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './dto/user';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.getById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatepasswordDto: UpdatePasswordDto,
  ) {
    return await this.usersService.update(id, updatepasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
