import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { CreateAlbumDto } from '../albums/dto/create-album.dto';
import { ArtistsService } from '../artists/artists.service';
import { CreateArtistDto } from '../artists/dto/creat-artist.dto';
import { Favorites } from '../interfaces';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavouritesDto } from './dto/favourites.dto';

@Injectable()
export class FavouritesService {
  private static favourites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    // private readonly artists: ArtistsService,
    // private readonly albums: AlbumsService,
    private readonly tracks: TracksService,
  ) {}

  getAll(): FavouritesDto {
    const fields = Object.keys(FavouritesService.favourites);
    const result = fields.reduce((acc, field) => {
      const fieldRes: CreateAlbumDto[] | CreateArtistDto[] | CreateTrackDto[] =
        FavouritesService.favourites[field].map((itemId: string) =>
          this[field].getById(itemId, true),
        );
      return { ...acc, [field]: fieldRes };
    }, {} as FavouritesDto);

    return result;
  }

  add(path: string, id: string): Favorites {
    const items = path + 's';
    const item = this[items].getById(id, true);
    if (!item) throw new UnprocessableEntityException();
    FavouritesService.favourites[items] = [
      ...FavouritesService.favourites[items],
      id,
    ];
    return item;
  }

  remove(path: string, id: string): void {
    const items = path + 's';
    FavouritesService.favourites[items] = FavouritesService.favourites[
      items
    ].filter((itemId: string) => itemId !== id);
  }
}
