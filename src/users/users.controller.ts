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
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatepasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.update(id, updatepasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
