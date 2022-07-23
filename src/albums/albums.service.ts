import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from '../interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { delRef, filterItems, findItem, mapItems } from '../common-handlers';
import { AlbumEntity } from './entity/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  // private static albums: Album[] = [];
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async getById(id: string, isFromFavs: boolean) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException();

    return album;
  }

  async create(body: CreateAlbumDto) {
    const album = this.albumRepository.create(body);
    const res = await this.albumRepository.save(album);

    return res;
  }

  async update(id: string, update: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException();

    const updatedAlbum = { ...album, ...update };
    await this.albumRepository.save(updatedAlbum);

    return updatedAlbum;
  }

  async remove(id: string) {
    const res = await this.albumRepository.delete(id);
    if (res.affected === 0) throw new NotFoundException();
  }

  // removeArtistRef(id: string): Album[] {
  //   return delRef(AlbumsService.albums, id, 'artistId');
  // }
}
