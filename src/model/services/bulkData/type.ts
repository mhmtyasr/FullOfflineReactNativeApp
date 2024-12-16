import {TodoBulkDataParams, TodoDto} from '../todo/type';
import {TodoDetailDto, TodoDetailsBulkDataParams} from '../todoDetails.ts/type';

export interface IPostBulkDataParams {
  todos: TodoBulkDataParams[];
  todoDetails: TodoDetailsBulkDataParams[];
}

export interface IGetBulkDataDto {
  todos: TodoDto[];
  todoDetails: TodoDetailDto[];
}
