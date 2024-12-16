import {BaseRequestParams} from '@/model/services/_base';

export type UseBaseMutationParams<
  ReqT,
  ResK extends {id: string} | undefined,
> = {
  onSuccess?: IBaseSuccesCallback<ResK>;
  onError?: IBaseErrorCallback;
  service: (data: ReqT) => Promise<ResK>;
  offlineService?: (data: ReqT) => Promise<ResK>;
  enabled?: boolean;
};

export type UseBaseQueryParams<
  ReqT extends BaseRequestParams | undefined,
  ResK,
  MappingT,
> = {
  queryKeys: [string, ReqT | undefined];
  onSuccess?: IBaseSuccesCallback<MappingT>;
  onError?: {
    message?: string;
    callback?: (e: any) => void;
  };
  service: (param: ReqT | undefined) => Promise<ResK>;
  offlineService?: (param: ReqT | undefined) => Promise<ResK>;
  enabled?: boolean;
  select?: (data: ResK) => MappingT;
  initialData?: undefined | ResK;
};

export interface IBaseSuccesCallback<ResK> {
  message?: string;
  callback?: (param: ResK | undefined) => void;
}

export interface IBaseErrorCallback {
  message?: string;
  callback?: (error: any) => void;
}

export interface IBaseMutationError {
  status: number;
  data: {Message: string; offlineId: number | null};
}
