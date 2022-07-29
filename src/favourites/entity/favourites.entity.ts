import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favourites')
export class FavouritEntity {
  @PrimaryColumn('int')
  id: number;

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  tracks: string[];
}
