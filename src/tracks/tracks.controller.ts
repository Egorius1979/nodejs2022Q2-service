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
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getTracks() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.getById(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createTrackDto: CreateTrackDto,
  ) {
    return this.tracksService.update(id, createTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
