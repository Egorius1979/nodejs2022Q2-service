import { Module } from '@nestjs/common';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavouritesModule } from './favourites/favourites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import ormconfig from './ormconf';

@Module({
  imports: [
    ArtistsModule,
    UsersModule,
    AlbumsModule,
    TracksModule,
    FavouritesModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
