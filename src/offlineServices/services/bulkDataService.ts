import {DependencyInjectionTokens} from '@/utils/dependencyInjectionTokens';
import {inject, injectable} from 'tsyringe';

import container from '../../utils/dependencyInjection';
import {TodoDetailRepository} from '../repository/todoDetailRepository';
import {
  IGetBulkDataDto,
  IPostBulkDataParams,
} from '@/model/services/bulkData/type';
import {appendUTCOffset, timestampToDateTime} from '@/utils/dateUtils';
import {TodoRepository} from '../repository/todoRepository';
import mapper from '../mapper/_base';
import {TodoBulkDataParams, TodoDto} from '@/model/services/todo/type';
import {Todo} from '../entity/todo';
import {TodoDetail} from '../entity/todoDetails';
import {
  TodoDetailDto,
  TodoDetailsBulkDataParams,
} from '@/model/services/todoDetails.ts/type';

@injectable()
export class BulkDataService {
  private todoDetailRepository: TodoDetailRepository;
  private todoRepository: TodoRepository;
  constructor(
    @inject(DependencyInjectionTokens.todoDetailRepository)
    todoDetailRepository: TodoDetailRepository,
    @inject(DependencyInjectionTokens.todoRepository)
    todoRepository: TodoRepository,
  ) {
    this.todoDetailRepository = todoDetailRepository;
    this.todoRepository = todoRepository;
  }

  getAllBulkData = async (lastGetSyncTime: number) => {
    const bulkData: IPostBulkDataParams = {
      todos: [],
      todoDetails: [],
    };

    await this.createTodoBulkData(bulkData, lastGetSyncTime);
    await this.createTodoDetailBulkData(bulkData, lastGetSyncTime);

    return bulkData;
  };

  hasChangedDataInDb = async (lastGetSyncTime: number): Promise<boolean> => {
    const hasChangedTodoData = await this.todoRepository.hasChangedData(
      timestampToDateTime(lastGetSyncTime),
    );

    if (hasChangedTodoData) {
      return Promise.resolve(true);
    }

    const hasChangedTodoDetailsData =
      await this.todoDetailRepository.hasChangedData(
        timestampToDateTime(lastGetSyncTime),
      );

    if (hasChangedTodoDetailsData) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  };
  createTodoBulkData = async (
    bulkData: IPostBulkDataParams,
    lastGetSyncTime: number,
  ): Promise<void> => {
    var todos = await this.todoRepository.getChangesData(
      timestampToDateTime(lastGetSyncTime),
    );

    bulkData.todos = mapper.mapArray(todos, Todo, TodoBulkDataParams);
  };
  createTodoDetailBulkData = async (
    bulkData: IPostBulkDataParams,
    lastGetSyncTime: number,
  ): Promise<void> => {
    var todoDetails = await this.todoDetailRepository.getChangesData(
      timestampToDateTime(lastGetSyncTime),
      ['todo'],
    );

    const data = mapper.mapArray(
      todoDetails,
      TodoDetail,
      TodoDetailsBulkDataParams,
    );
    bulkData.todoDetails = data;
  };

  setSync = async (data: IGetBulkDataDto) => {
    await this.syncTodo(data.todos);
    await this.syncTodoDetail(data.todoDetails);
  };
  private syncTodo = async (data: TodoDto[]) => {
    for (const item of data) {
      const _data = {
        createdDate: appendUTCOffset(item.createdDate),
        updatedDate: appendUTCOffset(item.updatedDate),
        deletedDate: appendUTCOffset(item.deletedDate),
        description: item.description,
        id: item.id,
        title: item.title,
        todoDetails: [],
        isCompleted: item.isCompleted,
      } as Todo;
      await this.todoRepository.save(_data);
    }
  };
  private syncTodoDetail = async (data: TodoDetailDto[]) => {
    for (const item of data) {
      const _data = {
        createdDate: item.createdDate,
        updatedDate: item.updatedDate,
        deletedDate: item.deletedDate,
        id: item.id,
        todoId: item.todo.id,
        isCompleted: item.isCompleted,
        detail: item.detail,
      } as TodoDetail;

      await this.todoDetailRepository.save(_data);
    }
  };
}

export default container.resolve(BulkDataService);
