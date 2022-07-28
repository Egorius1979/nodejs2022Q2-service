import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../albums/entity/album.entity';
import { ArtistEntity } from '../artists/entity/artist.entity';
import { TrackEntity } from '../tracks/entity/track.entity';
import { FavouritEntity } from './entity/favourites.entity';

@Injectable()
export class FavouritesService {
  private static favourites: FavouritEntity;

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
    const favs = await this.favouriteRepository.findOneBy({ id: 1 });

    if (!favs) {
      FavouritesService.favourites = {
        id: 1,
        artists: [],
        albums: [],
        tracks: [],
      };
      await this.favouriteRepository.save(FavouritesService.favourites);
      return;
    }
    if (favs && !FavouritesService.favourites) {
      FavouritesService.favourites = favs;
      return;
    }
  }

  async getAll() {
    await this.getFav();
    const fields = Object.keys(FavouritesService.favourites).filter(
      (it) => it !== 'id',
    );

    const result = await fields.reduce(async (acc, field) => {
      const fieldRes = await Promise.all(
        FavouritesService.favourites[field].map((id: string) =>
          this[field].findOneBy({ id }),
        ),
      );

      const resAcc = await acc;
      return { ...resAcc, [field]: fieldRes };
    }, Promise.resolve({}));

    return result;
  }

  async add(path: string, id: string) {
    await this.getFav();
    const items = path + 's';

    const item = await this[items].findOneBy({ id });
    if (!item) throw new UnprocessableEntityException();

    FavouritesService.favourites[items] = [
      ...FavouritesService.favourites[items],
      id,
    ];

    await this.favouriteRepository.update(1, {
      [items]: FavouritesService.favourites[items],
    });

    return item;
  }

  async remove(path: string, id: string) {
    const items = path + 's';

    const item = await this[items].findOneBy({ id });
    if (item) {
      await this.getFav();

      FavouritesService.favourites[items] = FavouritesService.favourites[
        items
      ].filter((itemId: string) => itemId !== id);

      await this.favouriteRepository.update(1, {
        [items]: FavouritesService.favourites[items],
      });
    }
  }
}
