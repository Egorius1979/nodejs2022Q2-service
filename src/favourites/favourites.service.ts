import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../albums/entity/album.entity';
import { ArtistEntity } from '../artists/entity/artist.entity';
import { TrackEntity } from '../tracks/entity/track.entity';
import { FavouritEntity } from './entity/favourites.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albums: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artists: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private tracks: Repository<TrackEntity>,
    @InjectRepository(FavouritEntity)
    private favouriteRepository: Repository<FavouritEntity>,
  ) {}

  async getFav() {
    const favourites = (await this.favouriteRepository.find())[0];
    // console.log(favourites);
    if (!favourites) {
      const newFav = {
        artists: [],
        albums: [],
        tracks: [],
      };
      // console.log(newFav);
      const res = await this.favouriteRepository.save(newFav);
      return res;
    }

    return favourites;
  }

  async getAll() {
    const favourites = await this.getFav();
    console.log('getAll: ', favourites);
    const fields = Object.keys(favourites);
    fields.shift();

    const result = await fields.reduce(async (acc, field) => {
      const fieldRes = await Promise.all(
        favourites[field].map((itemId: string) =>
          this[field].findOneBy({ id: itemId }),
        ),
      );

      const filterdfieldRes = fieldRes.filter((it) => it);
      // .then((res) => res.filter((it) => it));

      const resAcc = await acc;
      return { ...resAcc, [field]: filterdfieldRes };
    }, Promise.resolve({}));

    return result;
  }

  async add(path: string, id: string) {
    const favourites = await this.getFav();
    const items = path + 's';

    const item = await this[items].findOneBy({ id });
    if (!item) throw new UnprocessableEntityException();

    favourites[items] = [...favourites[items], id];
    await this.favouriteRepository.save(favourites);
    return item;
  }

  async remove(path: string, id: string) {
    const favourites = await this.getFav();
    const items = path + 's';

    favourites[items] = favourites[items].filter(
      (itemId: string) => itemId !== id,
    );
    await this.favouriteRepository.save(favourites);
  }
}
