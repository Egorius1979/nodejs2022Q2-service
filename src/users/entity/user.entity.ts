import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  refHash: string | null;

  toResponse() {
    const res = { ...this };
    delete res.password;
    res.createdAt = +res.createdAt;
    res.updatedAt = +res.updatedAt;
    return res;
  }
}
