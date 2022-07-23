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
// import { FavouritesService } from '../favourites/favourites.service';
// import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService, // private readonly tracksService: TracksService, // private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  async getAlbums() {
    return await this.albumsService.getAll();
  }

  @Get(':id')
  async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumsService.getById(id, false);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumsService.update(id, createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    // this.tracksService.removeAlbumRef(id);
    // this.favouritesService.remove('album', id);
    return await this.albumsService.remove(id);
  }
}
