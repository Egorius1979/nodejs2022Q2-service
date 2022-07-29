import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistEntity } from '../artists/entity/artist.entity';
import { FavouritEntity } from '../favourites/entity/favourites.entity';
import { FavouritesModule } from '../favourites/favourites.module';
import { FavouritesService } from '../favourites/favourites.service';
import { TrackEntity } from '../tracks/entity/track.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entity/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, FavouritesService],
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavouritEntity,
    ]),
    forwardRef(() => FavouritesModule),
    forwardRef(() => ArtistsModule),
  ],
  exports: [TypeOrmModule],
})
export class AlbumsModule {}
