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
import { Artist } from '../interfaces';
import { ArtistsService } from './artists.service';
import { createArtistDto } from './dto/creat-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  create(@Body() createArtistDto: createArtistDto): Artist {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createArtistDto: createArtistDto,
  ) {
    return this.artistsService.updateArtist(id, createArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.removeArtist(id);
  }
}
