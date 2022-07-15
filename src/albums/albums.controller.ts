import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  @Get()
  getAlbums() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.getById(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumsService.update(id, createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    this.tracksService.removeAlbumRef(id);
    return this.albumsService.remove(id);
  }
}
