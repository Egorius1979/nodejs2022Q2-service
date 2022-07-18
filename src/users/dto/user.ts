import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './create-user.dto';

export class User {
  id: string = uuidv4();
  login: string;

  @Exclude()
  password: string;

  version: number = 1;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();

  constructor(body: CreateUserDto) {
    this.login = body.login;
    this.password = body.password;
  }
}
