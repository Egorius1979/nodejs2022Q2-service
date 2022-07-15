import { Module } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService],
  exports: [AlbumsService],
  imports: [TracksService],
})
export class AlbumsModule {}
