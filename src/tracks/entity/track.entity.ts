import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../../albums/entity/album.entity';
import { ArtistEntity } from '../../artists/entity/artist.entity';
// import { ArtistEntity } from '../../artists/entity/artist.entity';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.track, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.track, {
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;
}
