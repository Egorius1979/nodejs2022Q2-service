import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favourites')
export class FavouritEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true })
  artists: string[];

  @Column('uuid', { array: true })
  albums: string[];

  @Column('uuid', { array: true })
  tracks: string[];
}
