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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/creat-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  async getArtists() {
    return await this.artistsService.getAll();
  }

  @Get(':id')
  async getArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistsService.getById(id);
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() update: UpdateArtistDto,
  ) {
    return await this.artistsService.update(id, update);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    await this.favouritesService.remove('artist', id);
    return await this.artistsService.remove(id);
  }
}
