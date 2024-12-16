import {EntityBase} from '../entity/_base';
import RepositoryBase from '../repository/_repositoryBase';

export default interface IBusinessBase<T> {
  validationForAddAsync: (params: T) => Promise<boolean>;
  validationForUpdateAsync: (params: T) => Promise<boolean>;
  addAsync: (params: T) => Promise<T>;
  updateAsync: (params: T) => Promise<T>;
}

export abstract class BusinessBase<T extends EntityBase>
  implements IBusinessBase<T>
{
  public readonly repository: RepositoryBase<T>;

  constructor(repository: RepositoryBase<T>) {
    this.repository = repository;
  }
  public abstract validationForAddAsync(entity: T): Promise<boolean>;
  public abstract validationForUpdateAsync(entity: T): Promise<boolean>;
  public async addAsync(entity: T): Promise<T> {
    if (await this.validationForAddAsync(entity)) {
      const addedEntity = await this.repository.insertAndGet(entity);
      return addedEntity;
    }
    throw new Error('Entity failed validation for add.');
  }
  public async updateAsync(entity: T): Promise<T> {
    if (await this.validationForUpdateAsync(entity)) {
      const updatedEntity = await this.repository.updateAndGet(entity);
      return updatedEntity;
    }
    throw new Error('Entity failed validation for update.');
  }
}
