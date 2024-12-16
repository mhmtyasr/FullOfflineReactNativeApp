import {DependencyInjectionTokens} from '@/utils/dependencyInjectionTokens';
import {TodoBusiness} from '../business/todoBusiness';
import {inject, injectable} from 'tsyringe';
import {
  PostTodoParams,
  PutTodoParams,
  TodoDto,
} from '@/model/services/todo/type';
import mapper from '../mapper/_base';
import {Todo} from '../entity/todo';

import container from '../../utils/dependencyInjection';
import {ServiceErrorHandler} from '@/utils/exceptionUtils';
import {UnitOfWork} from '@/utils/unitofworkUtils';

@injectable()
class TodoService {
  private todoBusiness: TodoBusiness;
  constructor(
    @inject(DependencyInjectionTokens.todoBusiness)
    todoBusiness: TodoBusiness,
  ) {
    this.todoBusiness = todoBusiness;
  }

  async getTodos(): Promise<TodoDto[]> {
    const todoList = await this.todoBusiness.getAll();
    return mapper.mapArray(todoList, Todo, TodoDto);
  }

  @ServiceErrorHandler
  @UnitOfWork
  async createTodo(param: PostTodoParams): Promise<TodoDto> {
    const data = mapper.map(param, PostTodoParams, Todo);
    const todo = await this.todoBusiness.addAsync(data);

    return mapper.map(todo, Todo, TodoDto);
  }

  @ServiceErrorHandler
  @UnitOfWork
  async updateTodo(param: PutTodoParams): Promise<TodoDto> {
    const data = mapper.map(param, PutTodoParams, Todo);
    return mapper.map(await this.todoBusiness.updateAsync(data), Todo, TodoDto);
  }

  @ServiceErrorHandler
  @UnitOfWork
  async deleteTodo(id: string): Promise<undefined> {
    this.todoBusiness.deleteAsync(id);
    return undefined;
  }
}

export default container.resolve(TodoService);
