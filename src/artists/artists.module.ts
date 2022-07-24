import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavouritesService } from '../favourites/favourites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { AlbumEntity } from '../albums/entity/album.entity';
import { TrackEntity } from '../tracks/entity/track.entity';
import { FavouritEntity } from '../favourites/entity/favourites.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, TracksService, FavouritesService],
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
      FavouritEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ArtistsModule {}
