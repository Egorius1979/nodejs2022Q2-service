import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { delRef, filterItems, findItem, mapItems } from '../common-handlers';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  // private static tracks: Track[] = [];
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async getById(id: string, isFromFavs: boolean) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException();

    return track;
  }

  async create(body: CreateTrackDto) {
    const track = this.trackRepository.create(body);
    const res = await this.trackRepository.save(track);

    return res;
  }

  async update(id: string, update: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException();

    const updatedTrack = { ...track, ...update };
    await this.trackRepository.save(updatedTrack);

    return updatedTrack;
  }

  async remove(id: string) {
    const res = await this.trackRepository.delete(id);
    if (res.affected === 0) throw new NotFoundException();
  }

  // removeArtistRef(id: string): Track[] {
  //   return delRef(TracksService.tracks, id, 'artistId');
  // }

  // removeAlbumRef(id: string): Track[] {
  //   return delRef(TracksService.tracks, id, 'albumId');
  // }
}
