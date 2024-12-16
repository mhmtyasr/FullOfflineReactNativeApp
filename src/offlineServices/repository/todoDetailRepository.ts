import {DependencyInjectionTokens} from '@/utils/dependencyInjectionTokens';
import {TodoDetail} from '../entity/todoDetails';
import RepositoryBase from './_repositoryBase';
import {inject, injectable} from 'tsyringe';
import {DataSource} from 'typeorm';

@injectable()
export class TodoDetailRepository extends RepositoryBase<TodoDetail> {
  constructor(@inject(DependencyInjectionTokens.dataSource) Db: DataSource) {
    super(TodoDetail, Db.manager);
  }
}
