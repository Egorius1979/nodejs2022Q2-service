import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '../interfaces';
import { CreateArtistDto } from './dto/creat-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { filterItems, findItem, mapItems } from '../common-handlers';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async getById(id: string, isFromFavs: boolean) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException();

    return artist;
  }

  async create(body: CreateArtistDto) {
    const artist = this.artistRepository.create(body);
    const res = await this.artistRepository.save(artist);

    return artist;
  }

  async update(id: string, update: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) throw new NotFoundException();

    const updatedArtist = { ...artist, ...update };
    await this.artistRepository.save(updatedArtist);

    return updatedArtist;
  }

  async remove(id: string) {
    const res = await this.artistRepository.delete(id);
    if (res.affected === 0) throw new NotFoundException();
  }
}
