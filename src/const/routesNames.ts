import {TodoDto} from '@/model/services/todo/type';

export enum RouteNames {
  TodoList = 'TodoList',
  TodoListDetial = 'TodoListDetial',
}

export interface IRoute {
  component: React.FC;
  name: keyof StackParamList;
}

export type StackParamList = {
  [RouteNames.TodoList]: never;
  [RouteNames.TodoListDetial]: TodoDto;
};
