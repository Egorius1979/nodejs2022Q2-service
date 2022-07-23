import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../../albums/entity/album.entity';
import { TrackEntity } from '../../tracks/entity/track.entity';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  album: AlbumEntity;

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  track: AlbumEntity;
}
