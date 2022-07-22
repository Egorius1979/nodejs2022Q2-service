import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { delRef, filterItems, findItem, mapItems } from '../common-handlers';

@Injectable()
export class AlbumsService {
  private static albums: Album[] = [];
  // constructor(
  //   @InjectRepository(UserEntity)
  //   private userRepository: Repository<UserEntity>,
  // ) {}

  getAll(): Album[] {
    return AlbumsService.albums;
  }

  getById(id: string, isFromFavs: boolean): Album {
    return findItem(AlbumsService.albums, id, isFromFavs);
  }

  create(body: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...body,
    };
    AlbumsService.albums = [...AlbumsService.albums, album];

    return album;
  }

  update(id: string, update: UpdateAlbumDto): Album {
    const album = findItem(AlbumsService.albums, id, false);
    const updatedAlbum = { ...album, ...update };

    mapItems(AlbumsService.albums, id, updatedAlbum);

    return updatedAlbum;
  }

  remove(id: string): void {
    findItem(AlbumsService.albums, id, false);
    AlbumsService.albums = filterItems(AlbumsService.albums, id);
  }

  removeArtistRef(id: string): Album[] {
    return delRef(AlbumsService.albums, id, 'artistId');
  }
}
