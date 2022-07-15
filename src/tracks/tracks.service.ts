import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  private static tracks: Track[] = [];

  getAll(): Track[] {
    return TracksService.tracks;
  }

  getById(id: string): Track {
    const track = TracksService.tracks.find((it) => it.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    return track;
  }

  create(body: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      ...body,
    };
    TracksService.tracks = [...TracksService.tracks, track];

    return track;
  }

  update(id: string, update: CreateTrackDto): Track {
    const track = TracksService.tracks.find((it) => it.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    track.name = update.name;
    track.artistId = update.artistId;
    track.albumId = update.albumId;
    track.duration = update.duration;

    TracksService.tracks = TracksService.tracks.map((it) =>
      it.id === id ? track : it,
    );

    return track;
  }

  remove(id: string): void {
    const track = TracksService.tracks.find((it) => it.id === id);
    if (!track) {
      throw new NotFoundException();
    }

    TracksService.tracks = TracksService.tracks.filter((it) => it.id !== id);
  }

  removeArtistRef(id: string): Track[] {
    return TracksService.tracks.map((it) => {
      if (it.artistId === id) {
        it.artistId = null;
      }
      return it;
    });
  }

  removeAlbumRef(id: string): Track[] {
    return TracksService.tracks.map((it) => {
      if (it.albumId === id) {
        it.albumId = null;
      }
      return it;
    });
  }
}
