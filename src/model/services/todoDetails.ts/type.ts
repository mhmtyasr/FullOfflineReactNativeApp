import {AutoMap} from '@automapper/classes';
import {BaseRequestParams, BaseResponseDTO} from '../_base';

export class TodoDetailDto extends BaseResponseDTO {
  @AutoMap()
  detail: string;

  @AutoMap()
  isCompleted: boolean;

  @AutoMap()
  todo: BaseRequestParams;
}

export class PostTodoDetailParams {
  @AutoMap()
  detail: string;

  @AutoMap()
  todo: BaseRequestParams;
}

export class PutTodoDetailParams extends BaseRequestParams {
  @AutoMap()
  isCompleted: boolean;

  todoDetail: BaseRequestParams;
}

export class GetTodoDetailParams extends BaseResponseDTO {}

export interface DeleteTodoDetailParams extends BaseResponseDTO {}

export class TodoDetailsBulkDataParams extends BaseRequestParams {
  @AutoMap()
  isCompleted: boolean;
  @AutoMap()
  detail: string;

  todo: BaseRequestParams;

  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date | null;
  @AutoMap()
  deletedDate: Date | null;
}
