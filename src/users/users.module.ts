import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
