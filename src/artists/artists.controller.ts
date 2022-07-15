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
import { Artist } from '../interfaces';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/creat-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  @Get()
  getArtists() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createArtistDto: CreateArtistDto,
  ) {
    return this.artistsService.update(id, createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    this.albumsService.removeArtistRef(id);
    this.tracksService.removeArtistRef(id);
    return this.artistsService.remove(id);
  }
}
