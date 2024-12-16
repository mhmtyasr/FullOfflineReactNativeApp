import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  MoreThan,
  Repository,
} from 'typeorm';
import {EntityBase} from '../entity/_base';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity.js';

export class RepositoryBase<T extends EntityBase> {
  private repository: Repository<T>;
  private defaultManager: EntityManager;

  constructor(private entity: new () => T, manager: EntityManager) {
    this.defaultManager = manager;
    this.repository = manager.getRepository(entity);
  }

  setManager(manager: EntityManager): void {
    this.repository = manager.getRepository(this.entity);
  }

  resetManager(): void {
    this.repository = this.defaultManager.getRepository(this.entity);
  }

  async getAll(options?: FindManyOptions<T>): Promise<T[]> {
    var data = this.repository.find(options);
    return data;
  }
  async getById(_id: string): Promise<T | null> {
    return await this.repository.findOne({
      //@ts-ignore
      where: {
        id: _id,
      },
    });
  }
  async createOrUpdate(entity: T) {
    await this.repository.save(entity);
  }
  async getChangesData(
    lastSyncDate: string,
    relations: FindOneOptions<T>['relations'] = [],
  ): Promise<T[]> {
    return this.repository.find({
      //@ts-ignore
      where: [
        {
          updatedDate: MoreThan(lastSyncDate),
        },
        {
          createdDate: MoreThan(lastSyncDate),
        },
        {
          deletedDate: MoreThan(lastSyncDate),
        },
      ],
      relations: relations,
    });
  }
  async hasChangedData(lastGetSyncTime: string): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder(this.repository.metadata.tableName)
      .where(
        `${this.repository.metadata.tableName}.createdDate > :lastGetSyncTime 
       OR ${this.repository.metadata.tableName}.updatedDate > :lastGetSyncTime 
       OR ${this.repository.metadata.tableName}.deletedDate > :lastGetSyncTime`,
        {lastGetSyncTime},
      )
      .getCount(); // Returns the count of records matching the condition

    return Promise.resolve(result > 0);
  }
  async insertAndGet(entity: T): Promise<T> {
    const returnData = await this.repository.insert(
      entity as QueryDeepPartialEntity<T>,
    );
    const data = await this.getById(returnData.generatedMaps[0].id)!;

    return data!;
  }
  async updateAndGet(partialEntity: T & {id: string}): Promise<T> {
    const cleanedEntity = removeUndefinedProps(partialEntity);
    await this.repository.save(cleanedEntity);
    const data = await this.getById(cleanedEntity.id)!;

    return data!;
  }
  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
  async find(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }
  async save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }
}
function removeUndefinedProps<T>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj as Object).filter(([_, value]) => value !== undefined),
  ) as T;
}

export default RepositoryBase;
