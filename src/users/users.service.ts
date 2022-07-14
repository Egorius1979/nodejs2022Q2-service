import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const user = this.users.find((it) => it.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  createUser(body: CreateUserDto): User {
    const user: User = new User(body);
    this.users = [...this.users, user];
    return user;
  }

  updateUser(id: string, update: UpdatePasswordDto) {
    const user = this.users.find((it) => it.id === id);

    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== update.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = update.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    this.users.map((it) => (it.id === id ? user : it));
    return user;
  }

  removeUser(id: string) {
    const user = this.users.find((it) => it.id === id);
    if (!user) {
      throw new NotFoundException();
    }

    this.users = this.users.filter((it) => it.id !== id);
  }
}
