import {useBaseMutation, useBaseQuery} from './_base';
import {SuccessCallback} from './_base/useBaseMutation';
import todoDetailService from '@/offlineServices/services/todoDetailService';
import {
  GetTodoDetailParams,
  PostTodoDetailParams,
  PutTodoDetailParams,
  TodoDetailDto,
} from '@/model/services/todoDetails.ts/type';
import {
  getTodoDetails,
  postTodoDetail,
  putTodoDetail,
} from '@/services/todoDetail';

export const useGetTodoDetails = ({params}: {params: GetTodoDetailParams}) => {
  return useBaseQuery<GetTodoDetailParams, TodoDetailDto[]>({
    queryKeys: ['todos', params],
    service: e => {
      return getTodoDetails(e!.id);
    },
    offlineService: e => {
      return todoDetailService.getTodoDetail(e!.id);
    },
  });
};
export const usePostTodoDetail = ({
  onSuccess,
}: {
  onSuccess?: SuccessCallback<TodoDetailDto>;
}) => {
  return useBaseMutation<PostTodoDetailParams, TodoDetailDto>({
    service: e => {
      return postTodoDetail(e!);
    },
    offlineService: e => {
      return todoDetailService.createTodoDetail(e!);
    },
    onSuccess: {
      callback: onSuccess,
      message: 'Todo Detail created successfully',
    },
  });
};
export const usePutTodoDetail = ({
  onSuccess,
}: {
  onSuccess?: SuccessCallback<TodoDetailDto>;
}) => {
  return useBaseMutation<PutTodoDetailParams, TodoDetailDto>({
    service: e => {
      return putTodoDetail(e!);
    },
    offlineService: e => {
      return todoDetailService.updateTodoDetail(e!);
    },
    onSuccess: {
      callback: onSuccess,
    },
  });
};
