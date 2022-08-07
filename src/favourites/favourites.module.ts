import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsModule } from '../artists/artists.module';
import { ArtistsService } from '../artists/artists.service';
import { TracksModule } from '../tracks/tracks.module';
import { TracksService } from '../tracks/tracks.service';
import { FavouritEntity } from './entity/favourites.entity';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService, ArtistsService, AlbumsService, TracksService],
  imports: [
    TypeOrmModule.forFeature([FavouritEntity]),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  exports: [FavouritesService, TypeOrmModule],
})
export class FavouritesModule {}
