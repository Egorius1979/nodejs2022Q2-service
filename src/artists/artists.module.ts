import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  providers: [ArtistsService, AlbumsService, TracksService],
  controllers: [ArtistsController],
  imports: [AlbumsService, TracksService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
