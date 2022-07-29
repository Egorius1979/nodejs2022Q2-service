import { Injectable } from '@nestjs/common';
import { Artist } from '../interfaces';
import { CreateArtistDto } from './dto/creat-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { filterItems, findItem, mapItems } from '../common-handlers';

@Injectable()
export class ArtistsService {
  private static artists: Artist[] = [];

  getAll() {
    return ArtistsService.artists;
  }

  getById(id: string, isFromFavs: boolean) {
    return findItem(ArtistsService.artists, id, isFromFavs);
  }

  create(body: CreateArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      ...body,
    };
    ArtistsService.artists = [...ArtistsService.artists, artist];

    return artist;
  }

  update(id: string, update: UpdateArtistDto) {
    const artist = findItem(ArtistsService.artists, id, false);
    const updatedArtist = { ...artist, ...update };

    mapItems(ArtistsService.artists, id, updatedArtist);

    return updatedArtist;
  }

  remove(id: string) {
    findItem(ArtistsService.artists, id, false);
    ArtistsService.artists = filterItems(ArtistsService.artists, id);
  }
}
