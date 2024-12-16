import {
  PostTodoParams,
  PutTodoParams,
  TodoDto,
} from '@/model/services/todo/type';
import httpClient from '@/utils/http';

export const getTodos = async (): Promise<TodoDto[]> => {
  return httpClient.get('todo', {});
};

export const postTodo = async (todo: PostTodoParams): Promise<TodoDto> => {
  return httpClient.post('todo', todo);
};

export const putTodo = async (todo: PutTodoParams): Promise<TodoDto> => {
  return httpClient.put('todo', todo);
};

export const deleteTodo = async (id: string): Promise<undefined> => {
  return await httpClient.delete('todo', {
    id,
  });
};
