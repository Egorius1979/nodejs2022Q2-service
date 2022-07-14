import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll() {
    return this.users;
  }

  getUser(id: string) {
    const res = this.users.find((user) => user.id === id);
    if (!res) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  createUser(createUserDto: CreateUserDto): User {
    const user: User = new User(createUserDto);
    this.users = [...this.users, user];
    return user;
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('forbidden', HttpStatus.FORBIDDEN);
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    this.users.map((it) => (user.id === id ? user : it));
    return user;
  }

  removeUser(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    this.users = this.users.filter((user) => user.id !== id);
  }
}
