import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artists/entity/artist.entity';
import { TrackEntity } from '../../tracks/entity/track.entity';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.album, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  track: TrackEntity;
}
