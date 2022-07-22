import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { ArtistEntity } from './src/artists/entity/artist.entity';
import { UserEntity } from './src/users/entity/user.entity';

export default {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, ArtistEntity],
  synchronize: true,
  // retryAttempts: 10,
} as DataSourceOptions;
