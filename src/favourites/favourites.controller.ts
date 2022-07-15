import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateFavouritesDto } from './dto/create-favourites.dto';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  getFavs(): CreateFavouritesDto {
    return this.favouritesService.getAll();
  }

  @Post(':path/:id')
  addFavItem(
    @Param('path') path: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favouritesService.add(path, id);
  }

  @Delete(':path/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(
    @Param('path') path: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favouritesService.remove(path, id);
  }
}
