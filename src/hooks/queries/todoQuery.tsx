import {
  PostTodoParams,
  PutTodoParams,
  TodoDto,
} from '../../model/services/todo/type';
import todoService from '../../offlineServices/services/todoService';
import {useBaseMutation, useBaseQuery} from './_base';
import {BaseRequestParams} from '@/model/services/_base';
import {SuccessCallback} from './_base/useBaseMutation';
import {deleteTodo, getTodos, postTodo, putTodo} from '@/services/todo';

export const useGetTodos = () => {
  return useBaseQuery<undefined, TodoDto[]>({
    queryKeys: ['todos', undefined],
    service: () => {
      return getTodos();
    },
    offlineService: () => {
      return todoService.getTodos();
    },
  });
};
export const usePostTodo = ({
  onSuccess,
}: {
  onSuccess?: SuccessCallback<TodoDto>;
}) => {
  return useBaseMutation<PostTodoParams, TodoDto>({
    service: e => postTodo(e),
    offlineService: e => todoService.createTodo(e),
    onSuccess: {
      callback: onSuccess,
      message: 'Todo created successfully',
    },
  });
};
export const usePutTodo = ({
  onSuccess,
}: {
  onSuccess?: SuccessCallback<TodoDto>;
}) => {
  return useBaseMutation<PutTodoParams, TodoDto>({
    service: e => putTodo(e),
    offlineService: e => todoService.updateTodo(e),
    onSuccess: {
      callback: onSuccess,
      message: 'Todo updated successfully',
    },
  });
};
export const useDeleteTodo = ({
  onSuccess,
}: {
  onSuccess?: SuccessCallback<undefined>;
}) => {
  return useBaseMutation<BaseRequestParams, undefined>({
    service: e => {
      return deleteTodo(e.id);
    },
    offlineService: e => {
      return todoService.deleteTodo(e.id);
    },
    onSuccess: {
      callback: onSuccess,
      message: 'Todo deleted successfully',
    },
  });
};
