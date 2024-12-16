import {Todo} from '../entity/todo';
import RepositoryBase from './_repositoryBase';
import {inject, injectable} from 'tsyringe';
import {DependencyInjectionTokens} from '@/utils/dependencyInjectionTokens';
import {DataSource} from 'typeorm';

@injectable()
export class TodoRepository extends RepositoryBase<Todo> {
  constructor(@inject(DependencyInjectionTokens.dataSource) Db: DataSource) {
    super(Todo, Db.manager);
  }
}
