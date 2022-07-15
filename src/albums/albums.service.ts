import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '../interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  private static albums: Album[] = [];

  getAll(): Album[] {
    return AlbumsService.albums;
  }

  getById(id: string): Album {
    const album = AlbumsService.albums.find((it) => it.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  create(body: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...body,
    };
    AlbumsService.albums = [...AlbumsService.albums, album];

    return album;
  }

  update(id: string, update: CreateAlbumDto): Album {
    const album = AlbumsService.albums.find((it) => it.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    album.name = update.name;
    album.year = update.year;
    album.artistId = update.artistId;

    AlbumsService.albums = AlbumsService.albums.map((it) =>
      it.id === id ? album : it,
    );

    return album;
  }

  remove(id: string): void {
    const album = AlbumsService.albums.find((it) => it.id === id);
    if (!album) {
      throw new NotFoundException();
    }

    AlbumsService.albums = AlbumsService.albums.filter((it) => it.id !== id);
  }

  removeArtistRef(id: string): Album[] {
    return AlbumsService.albums.map((it) => {
      if (it.artistId === id) {
        it.artistId = null;
      }
      return it;
    });
  }
}
