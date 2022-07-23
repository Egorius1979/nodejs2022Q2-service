import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavouritesService } from '../favourites/favourites.service';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { AlbumEntity } from '../albums/entity/album.entity';
import { TrackEntity } from '../tracks/entity/track.entity';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, TracksService, FavouritesService],
  imports: [
    // AlbumsModule, TracksModule, forwardRef(() => FavouritesModule)
    TypeOrmModule.forFeature([ArtistEntity, AlbumEntity, TrackEntity]),
  ],
  exports: [ArtistsService],
})
export class ArtistsModule {}
