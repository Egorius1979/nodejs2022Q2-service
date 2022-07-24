import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../common-handlers';

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
    const user = await findItem(this.userRepository, id);
    return user.toResponse();
  }

  async create(body: CreateUserDto) {
    const timestamp = Date.now();
    const user = {
      ...body,
      createdAt: timestamp,
      updatedAt: timestamp,
      version: 1,
    };

    const createdUser = await createItem(this.userRepository, user);
    return createdUser.toResponse();
  }

  async update(id: string, update: UpdatePasswordDto) {
    const updatedUser = await updateItem(this.userRepository, id, update);
    return updatedUser.toResponse();
  }

  async remove(id: string) {
    await deleteItem(this.userRepository, id);
  }
}
