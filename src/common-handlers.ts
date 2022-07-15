import { NotFoundException } from '@nestjs/common';

export const findItem = (arr, id: string, isFromFavs: boolean) => {
  const res = arr.find((it) => it.id === id);
  if (!res && !isFromFavs) throw new NotFoundException();

  return res;
};

export const mapItems = (arr, id: string, item) => {
  return arr.map((it) => (it.id === id ? item : it));
};

export const filterItems = (arr, id: string) => {
  return arr.filter((it) => it.id !== id);
};

export const delRef = (arr, id, refName) => {
  return arr.map((it) => {
    if (it[refName] === id) {
      it[refName] = null;
    }
    return it;
  });
};
