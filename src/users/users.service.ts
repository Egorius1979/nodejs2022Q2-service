import { ForbiddenException, Injectable } from '@nestjs/common';
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
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(login: string, pass: string) {
    const users = await this.userRepository.findBy({ login });
    if (!users.length) throw new ForbiddenException();

    const user = users.find((user) => bcrypt.compareSync(pass, user.password));
    if (!user) throw new ForbiddenException();

    return user;
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getById(id: string) {
    const user = await findItem(this.userRepository, id);
    return user.toResponse();
  }

  async create(body: CreateUserDto) {
    const hash = await this.getHash(body.password);
    const timestamp = Date.now();

    const user = {
      login: body.login,
      password: hash,
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

  getHash(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefresHash(userId: string, token: string) {
    const hash = await this.getHash(token);
    await this.userRepository.update({ id: userId }, { refHash: hash });
  }
}
