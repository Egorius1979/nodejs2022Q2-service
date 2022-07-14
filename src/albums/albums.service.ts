import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  getAll(): Album[] {
    return this.albums;
  }

  getAlbum(id: string): Album {
    const album = this.albums.find((it) => it.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  createAlbum(body: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...body,
    };
    this.albums = [...this.albums, album];

    return album;
  }

  updateAlbum(id: string, update: CreateAlbumDto): Album {
    const album = this.albums.find((it) => it.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    album.name = update.name;
    album.year = update.year;
    album.artistId = update.artistId;

    this.albums = this.albums.map((it) => (it.id === id ? album : it));

    return album;
  }

  removeArtist(id: string): void {
    const album = this.albums.find((it) => it.id === id);
    if (!album) {
      throw new NotFoundException();
    }

    this.albums = this.albums.filter((it) => it.id !== id);
  }
}
