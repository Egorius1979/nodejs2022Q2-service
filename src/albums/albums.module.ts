import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsModule } from '../artists/artists.module';
import { FavouritesModule } from '../favourites/favourites.module';
import { FavouritesService } from '../favourites/favourites.service';
import { TracksModule } from '../tracks/tracks.module';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entity/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    //  TracksService, FavouritesService
  ],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    // TracksModule,
    // forwardRef(() => FavouritesModule),
    // forwardRef(() => ArtistsModule),
  ],
  exports: [AlbumsService],
})
export class AlbumsModule {}
