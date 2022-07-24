import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entity/album.entity';
import { Repository } from 'typeorm';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../common-handlers';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async getById(id: string) {
    return await findItem(this.albumRepository, id);
  }

  async create(body: CreateAlbumDto) {
    return await createItem(this.albumRepository, body);
  }

  async update(id: string, update: UpdateAlbumDto) {
    return await updateItem(this.albumRepository, id, update);
  }

  async remove(id: string) {
    await deleteItem(this.albumRepository, id);
  }
}
