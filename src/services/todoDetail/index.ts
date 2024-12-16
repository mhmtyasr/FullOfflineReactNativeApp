import {
  PostTodoDetailParams,
  PutTodoDetailParams,
  TodoDetailDto,
} from '@/model/services/todoDetails.ts/type';
import httpClient from '@/utils/http';

export const getTodoDetails = async (
  todoId: string,
): Promise<TodoDetailDto[]> => {
  return httpClient.get('todoDetail', {todoId});
};

export const postTodoDetail = async (
  TodoDetail: PostTodoDetailParams,
): Promise<TodoDetailDto> => {
  return httpClient.post('todoDetail', TodoDetail);
};

export const putTodoDetail = async (
  TodoDetail: PutTodoDetailParams,
): Promise<TodoDetailDto> => {
  return httpClient.put('todoDetail', TodoDetail);
};

export const deleteTodoDetail = async (id: number): Promise<undefined> => {
  return await httpClient.delete('todoDetail', {
    id,
  });
};
