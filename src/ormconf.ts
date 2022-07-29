import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AlbumEntity } from './albums/entity/album.entity';
import { ArtistEntity } from './artists/entity/artist.entity';
import { FavouritEntity } from './favourites/entity/favourites.entity';
import { TrackEntity } from './tracks/entity/track.entity';
import { UserEntity } from './users/entity/user.entity';

export default {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
} as DataSourceOptions;
