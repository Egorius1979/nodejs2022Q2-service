import { Controller, Get, Param, Post } from '@nestjs/common';
import { Favorites } from '../interfaces';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  getFavs(): Favorites {
    return this.favouritesService.getAll();
  }

  @Post(':path/:id')
  addFavItem(@Param('path') path: string, @Param('id') id: string) {
    return this.favouritesService.add(path, id);
  }
}
