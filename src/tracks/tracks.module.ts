import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavouritesService } from '../favourites/favourites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { FavouritEntity } from '../favourites/entity/favourites.entity';
import { AlbumEntity } from '../albums/entity/album.entity';
import { ArtistEntity } from '../artists/entity/artist.entity';

@Module({
  providers: [TracksService, FavouritesService],
  controllers: [TracksController],
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      FavouritEntity,
      AlbumEntity,
      ArtistEntity,
    ]),
  ],
})
export class TracksModule {}
