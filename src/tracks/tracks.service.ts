import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  getAll(): Track[] {
    return this.tracks;
  }

  getTrack(id: string): Track {
    const track = this.tracks.find((it) => it.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  createTrack(body: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      ...body,
    };
    this.tracks = [...this.tracks, track];

    return track;
  }

  updateTrack(id: string, update: CreateTrackDto): Track {
    const track = this.tracks.find((it) => it.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    track.name = update.name;
    track.artistId = update.artistId;
    track.albumId = update.albumId;
    track.duration = update.duration;

    this.tracks = this.tracks.map((it) => (it.id === id ? track : it));

    return track;
  }

  removeArtist(id: string): void {
    const track = this.tracks.find((it) => it.id === id);
    if (!track) {
      throw new NotFoundException();
    }

    this.tracks = this.tracks.filter((it) => it.id !== id);
  }
}
