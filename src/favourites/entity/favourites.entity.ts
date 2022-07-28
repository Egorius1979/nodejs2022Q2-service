import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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

  //   @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
  //     onDelete: 'NO ACTION',
  //   })
  //   artist: ArtistEntity;

  //   @ManyToOne(() => AlbumEntity, (album) => album.id, {
  //     onDelete: 'NO ACTION',
  //   })
  //   album: ArtistEntity;

  //   @ManyToOne(() => TrackEntity, (track) => track.id, {
  //     onDelete: 'NO ACTION',
  //   })
  //   track: ArtistEntity;
}
