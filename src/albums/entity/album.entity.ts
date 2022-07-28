import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entity/artist.entity';
import { FavouritEntity } from '../../favourites/entity/favourites.entity';

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

  @ManyToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  // @ManyToOne(() => FavouritEntity, favourites => favourites.album)
  // favourites: ArtistEntity;
}
