import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { filterItems, findItem, mapItems } from '../common-handlers';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll() {
    const withoutPass = this.users.reduce((acc, rec) => {
      const user = { ...rec };
      delete user.password;
      return [...acc, user];
    }, []);
    return withoutPass;
  }

  getById(id: string) {
    const user = { ...findItem(this.users, id, false) };
    delete user.password;
    return user;
  }

  create(body: CreateUserDto): User {
    const user: User = new User(body);
    this.users = [...this.users, user];
    return user;
  }

  update(id: string, update: UpdatePasswordDto) {
    const user = findItem(this.users, id, false);

    if (user.password !== update.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = update.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    mapItems(this.users, id, user);

    return user;
  }

  remove(id: string) {
    findItem(this.users, id, false);
    this.users = filterItems(this.users, id);
  }
}
