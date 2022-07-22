// import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './create-user.dto';

export class User {
  id: string;
  login: string;
  password: string;
  version: number = 1;
  createdAt: number = Date.now();
  updatedAt: number;

  constructor(body: CreateUserDto) {
    this.login = body.login;
    this.password = body.password;
    this.updatedAt = this.createdAt;
  }
}
