import { IsArray } from 'class-validator';
import { Album, Artist, Track } from '../../interfaces';

export class CreateFavourites {
  @IsArray()
  artists: Artist[];

  @IsArray()
  albums: Album[];

  @IsArray()
  tracks: Track[];
}
