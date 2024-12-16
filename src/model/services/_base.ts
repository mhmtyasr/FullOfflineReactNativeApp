import {AutoMap} from '@automapper/classes';

export class Auditable {
  @AutoMap()
  createdDate: Date;

  @AutoMap()
  updatedDate: Date | null;

  @AutoMap()
  deletedDate: Date | null;
}

export class BaseResponseDTO extends Auditable {
  @AutoMap()
  id: string;
}

export class BaseRequestParams {
  @AutoMap()
  id: string;
}
