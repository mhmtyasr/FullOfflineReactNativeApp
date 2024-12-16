import {TodoDetailBusiness} from '@/offlineServices/business/todoDetailBusiness';
import {TodoDetailRepository} from '@/offlineServices/repository/todoDetailRepository';
import {container} from 'tsyringe';
import {DependencyInjectionTokens} from './dependencyInjectionTokens';
import {TodoRepository} from '@/offlineServices/repository/todoRepository';
import {TodoBusiness} from '@/offlineServices/business/todoBusiness';
import dataSource from '@/offlineServices/dbSource';

container.register(DependencyInjectionTokens.todoDetailRepository, {
  useClass: TodoDetailRepository,
});

container.register(DependencyInjectionTokens.todoRepository, {
  useClass: TodoRepository,
});

container.register(DependencyInjectionTokens.todoBusiness, {
  useClass: TodoBusiness,
});

container.register(DependencyInjectionTokens.todoDetailBusiness, {
  useClass: TodoDetailBusiness,
});

container.registerInstance(DependencyInjectionTokens.dataSource, dataSource);

export default container;
