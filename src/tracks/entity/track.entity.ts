import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from '../../albums/entity/album.entity';
import { ArtistEntity } from '../../artists/entity/artist.entity';

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

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, {
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;
}
