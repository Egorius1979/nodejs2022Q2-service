import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavouritesModule } from '../favourites/favourites.module';
import { FavouritesService } from '../favourites/favourites.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  providers: [TracksService, FavouritesService],
  controllers: [TracksController],
  exports: [TracksService],
  imports: [
    forwardRef(() => FavouritesModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
  ],
})
export class TracksModule {}
