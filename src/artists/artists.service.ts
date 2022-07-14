import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Artist } from '../interfaces';
import { createArtistDto } from './dto/creat-artist.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  getAll() {
    return this.artists;
  }

  getArtist(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  createArtist(createArtistDto: createArtistDto): Artist {
    const artist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists = [...this.artists, artist];

    return artist;
  }

  updateArtist(id: string, createArtistDto: createArtistDto) {
    const res = this.artists.find((artist) => artist.id === id);
    if (!res) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    res.name = createArtistDto.name;
    res.grammy = createArtistDto.grammy;

    this.artists = this.artists.map((artist) =>
      artist.id === id ? res : artist,
    );

    return res;
  }

  removeArtist(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
