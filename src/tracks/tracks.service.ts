import { Injectable } from '@nestjs/common';
import { Track } from '../interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { delRef, filterItems, findItem, mapItems } from '../common-handlers';

@Injectable()
export class TracksService {
  private static tracks: Track[] = [];

  getAll(): Track[] {
    return TracksService.tracks;
  }

  getById(id: string, isFromFavs: boolean): Track {
    return findItem(TracksService.tracks, id, isFromFavs);
  }

  create(body: CreateTrackDto): Track {
    const track = {
      id: uuidv4(),
      ...body,
    };
    TracksService.tracks = [...TracksService.tracks, track];

    return track;
  }

  update(id: string, update: UpdateTrackDto): Track {
    const track = findItem(TracksService.tracks, id, false);
    const updatedTrack = { ...track, ...update };

    mapItems(TracksService.tracks, id, updatedTrack);

    return updatedTrack;
  }

  remove(id: string): void {
    findItem(TracksService.tracks, id, false);
    TracksService.tracks = filterItems(TracksService.tracks, id);
  }

  removeArtistRef(id: string): Track[] {
    return delRef(TracksService.tracks, id, 'artistId');
  }

  removeAlbumRef(id: string): Track[] {
    return delRef(TracksService.tracks, id, 'albumId');
  }
}
