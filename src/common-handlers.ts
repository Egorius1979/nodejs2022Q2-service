import { ForbiddenException, NotFoundException } from '@nestjs/common';

export const findItem = async (repository, id: string) => {
  const res = await repository.findOneBy({ id });
  if (!res) throw new NotFoundException();

  return res;
};

export const createItem = async (repository, body) => {
  const createdItem = await repository.create(body);
  const res = await repository.save(createdItem);

  return res;
};

export const updateItem = async (repository, id: string, update) => {
  const item = await findItem(repository, id);

  if (item.password) {
    if (item.password !== update.oldPassword) {
      throw new ForbiddenException();
    }
    item.password = update.newPassword;
    item.updatedAt = Date.now();
    item.version += 1;
  }

  const updatedItem = item.password ? item : { ...item, ...update };
  const res = await repository.save(updatedItem);
  return res;
};

export const deleteItem = async (repository, id: string) => {
  const res = await repository.delete(id);
  if (res.affected === 0) throw new NotFoundException();
};
