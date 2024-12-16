import TodoDetailRepository from './todoDetailRepository';
import TodoRepository from './todoRepository';

const todoRepository = new TodoRepository();
const todoDetailRepository = new TodoDetailRepository();

export default {
  todoRepository,
  todoDetailRepository,
};
