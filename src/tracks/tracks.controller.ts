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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService, // private readonly favouritesService: FavouritesService,
  ) {}

  @Get()
  async getTracks() {
    return await this.tracksService.getAll();
  }

  @Get(':id')
  async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.tracksService.getById(id, false);
  }

  @Post()
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() update: UpdateTrackDto,
  ) {
    return await this.tracksService.update(id, update);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    // this.favouritesService.remove('track', id);
    return await this.tracksService.remove(id);
  }
}
