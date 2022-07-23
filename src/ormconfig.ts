import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { AlbumEntity } from './albums/entity/album.entity';
import { ArtistEntity } from './artists/entity/artist.entity';
import { UserEntity } from './users/entity/user.entity';

export default {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, ArtistEntity, AlbumEntity],
  synchronize: true,
  // retryAttempts: 10,
} as DataSourceOptions;
