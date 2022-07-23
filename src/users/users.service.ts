import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { filterItems, findItem, mapItems } from '../common-handlers';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async create(body: CreateUserDto) {
    const user = this.userRepository.create(new User(body));
    const res = await this.userRepository.save(user);
    return res.toResponse();
  }

  async update(id: string, update: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException();
    if (user.password !== update.oldPassword) {
      throw new ForbiddenException();
    }

    user.password = update.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    const updatedUser = await this.userRepository.save(user);
    return updatedUser.toResponse();
  }

  async remove(id: string) {
    const res = await this.userRepository.delete(id);
    if (res.affected === 0) throw new NotFoundException();
  }
}
