import { Module } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService, ArtistsService, AlbumsService, TracksService],
  imports: [ArtistsService, AlbumsService, TracksService],
})
export class FavouritesModule {}
