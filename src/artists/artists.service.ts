import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../interfaces';
import { CreateArtistDto } from './dto/creat-artist.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAll() {
    return this.artists;
  }

  getArtist(id: string) {
    const artist = this.artists.find((it) => it.id === id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  createArtist(body: CreateArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      ...body,
    };
    this.artists = [...this.artists, artist];

    return artist;
  }

  updateArtist(id: string, update: CreateArtistDto) {
    const artist = this.artists.find((it) => it.id === id);
    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = update.name;
    artist.grammy = update.grammy;

    this.artists = this.artists.map((artist) =>
      artist.id === id ? artist : artist,
    );

    return artist;
  }

  removeArtist(id: string) {
    const artist = this.artists.find((it) => it.id === id);
    if (!artist) {
      throw new NotFoundException();
    }

    this.artists = this.artists.filter((it) => it.id !== id);
  }
}
