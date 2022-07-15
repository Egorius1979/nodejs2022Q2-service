import { Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { Favorites } from '../interfaces';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavouritesService {
  private readonly favourites: Favorites;

  constructor(
    private readonly artist: ArtistsService,
    private readonly album: AlbumsService,
    private readonly track: TracksService,
  ) {}

  getAll(): Favorites {
    return this.favourites;
  }

  add(path: string, id: string) {
    const item = this[path].ge;
  }
}
