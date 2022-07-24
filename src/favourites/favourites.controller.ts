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
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  async getFavs() {
    return await this.favouritesService.getAll();
  }

  @Post(':path/:id')
  async addFavItem(
    @Param('path') path: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.favouritesService.add(path, id);
  }

  @Delete(':path/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavs(
    @Param('path') path: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.favouritesService.remove(path, id);
  }
}
