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
import { AlbumsService } from '../albums/albums.service';
import { FavouritesService } from '../favourites/favourites.service';
import { Artist } from '../interfaces';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/creat-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService, // private readonly albumsService: AlbumsService, // private readonly tracksService: TracksService, // private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  getArtists() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.getById(id, false);
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    return await this.artistsService.update(id, createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    // this.albumsService.removeArtistRef(id);
    // this.tracksService.removeArtistRef(id);
    // this.favouritesService.remove('artist', id);
    return await this.artistsService.remove(id);
  }
}
