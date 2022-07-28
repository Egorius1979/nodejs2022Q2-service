import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/creat-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { Repository } from 'typeorm';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../common-handlers';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    return await this.artistRepository.find();
  }

  async getById(id: string) {
    return await findItem(this.artistRepository, id);
  }

  async create(body: CreateArtistDto) {
    return await createItem(this.artistRepository, body);
  }

  async update(id: string, update: UpdateArtistDto) {
    return await updateItem(this.artistRepository, id, update);
  }

  async remove(id: string) {
    return await deleteItem(this.artistRepository, id);
  }
}
