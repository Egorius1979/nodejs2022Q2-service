import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FavouritEntity } from '../../favourites/entity/favourites.entity';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  // @ManyToOne(() => FavouritEntity, (favourites) => favourites.artist)
  // favourites: ArtistEntity;
}
