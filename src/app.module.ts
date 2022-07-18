import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [ArtistsModule, UsersModule, AlbumsModule, TracksModule, FavouritesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
