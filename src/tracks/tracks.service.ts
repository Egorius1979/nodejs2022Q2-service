import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { Repository } from 'typeorm';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../common-handlers';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    return await findItem(this.trackRepository, id);
  }

  async create(body: CreateTrackDto) {
    return await createItem(this.trackRepository, body);
  }

  async update(id: string, update: UpdateTrackDto) {
    return await updateItem(this.trackRepository, id, update);
  }

  async remove(id: string) {
    return await deleteItem(this.trackRepository, id);
  }
}
