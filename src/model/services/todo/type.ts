import {AutoMap} from '@automapper/classes';
import {BaseRequestParams, BaseResponseDTO, IAuditables} from '../_base';

export class TodoDto extends BaseResponseDTO {
  @AutoMap()
  title: string;
  @AutoMap()
  description: string;
  @AutoMap()
  isCompleted: boolean;
}

export class PostTodoParams {
  @AutoMap()
  title: string;
  @AutoMap()
  description?: string;
}

export class PutTodoParams extends BaseRequestParams {
  @AutoMap()
  description: string;
}

export interface DeleteTodoParams extends BaseRequestParams {}

export class TodoBulkDataParams extends BaseRequestParams {
  @AutoMap()
  title: string;
  @AutoMap()
  description?: string;
  @AutoMap()
  createdDate: Date;
  @AutoMap()
  updatedDate: Date | null;
  @AutoMap()
  deletedDate: Date | null;
}
