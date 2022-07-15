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
import { FavouritesService } from '../favourites/favourites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  getAlbums() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.getById(id, false);
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
    this.favouritesService.remove('album', id);
    return this.albumsService.remove(id);
  }
}
