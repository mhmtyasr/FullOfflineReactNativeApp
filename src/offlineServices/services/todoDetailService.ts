import {DependencyInjectionTokens} from '@/utils/dependencyInjectionTokens';
import {TodoDetailBusiness} from '../business/todoDetailBusiness';
import {inject, injectable} from 'tsyringe';
import {
  PostTodoDetailParams,
  PutTodoDetailParams,
  TodoDetailDto,
} from '@/model/services/todoDetails.ts/type';
import mapper from '../mapper/_base';
import {TodoDetail} from '../entity/todoDetails';

import container from '../../utils/dependencyInjection';
import {ServiceErrorHandler} from '@/utils/exceptionUtils';
import {UnitOfWork} from '@/utils/unitofworkUtils';

@injectable()
class TodoDetailService {
  private todoDetailBusiness: TodoDetailBusiness;

  constructor(
    @inject(DependencyInjectionTokens.todoDetailBusiness)
    todoDetailBusiness: TodoDetailBusiness,
  ) {
    this.todoDetailBusiness = todoDetailBusiness;
  }

  async getTodoDetail(todoId: string): Promise<TodoDetailDto[]> {
    const data = await this.todoDetailBusiness.getAll({
      where: {
        todoId,
      },
    });
    return mapper.mapArray(data, TodoDetail, TodoDetailDto);
  }

  @ServiceErrorHandler
  @UnitOfWork
  async createTodoDetail(param: PostTodoDetailParams): Promise<TodoDetailDto> {
    const data = await this.todoDetailBusiness.addAsync(
      mapper.map(param, PostTodoDetailParams, TodoDetail),
    );

    data.isCompleted = false;

    return mapper.map(data, TodoDetail, TodoDetailDto);
  }
  @ServiceErrorHandler
  @UnitOfWork
  async updateTodoDetail(
    updatedTodo: PutTodoDetailParams,
  ): Promise<TodoDetailDto> {
    const todoDetail = mapper.map(updatedTodo, PutTodoDetailParams, TodoDetail);
    const todo = await this.todoDetailBusiness.updateAsync(todoDetail);
    return mapper.map(todo, TodoDetail, TodoDetailDto);
  }
}

export default container.resolve(TodoDetailService);
