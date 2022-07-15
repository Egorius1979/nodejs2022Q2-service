import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavouritesService } from '../favourites/favourites.service';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavouritesModule } from '../favourites/favourites.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, TracksService, FavouritesService],
  imports: [AlbumsModule, TracksModule, forwardRef(() => FavouritesModule)],
  exports: [ArtistsService],
})
export class ArtistsModule {}
