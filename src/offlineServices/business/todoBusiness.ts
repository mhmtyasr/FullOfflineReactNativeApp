import {injectable, inject} from 'tsyringe';
import {TodoRepository} from '../repository/todoRepository';
import {BusinessBase} from './_businessBase';
import {Todo} from '../entity/todo';
import ValidationException, {ValidationUtils} from '@/utils/exceptionUtils';
import {DependencyInjectionTokens} from '@/utils/dependencyInjectionTokens';

@injectable()
export class TodoBusiness extends BusinessBase<Todo> {
  constructor(
    @inject(DependencyInjectionTokens.todoRepository)
    repository: TodoRepository,
  ) {
    super(repository);
  }

  getAll(): Promise<Todo[]> {
    return this.repository.getAll();
  }

  addAsync(params: Todo): Promise<Todo> {
    this.validationForAddAsync(params);

    return this.repository.insertAndGet(params);
  }

  async updateAsync(entity: Todo): Promise<Todo> {
    var existingTodo = await this.repository.getById(entity.id);

    if (existingTodo == null) {
      throw ValidationException('Todo not found');
    }

    this.validationForUpdateAsync(entity);
    return this.repository.updateAndGet(entity);
  }

  deleteAsync(id: string): Promise<void> {
    this.validationForDelete(id);
    this.repository.softDelete(id);
    return Promise.resolve();
  }

  async validationForAddAsync(params: Todo): Promise<boolean> {
    if (ValidationUtils.isNullOrWhiteSpace(params.title)) {
      throw ValidationException('Title is required');
    }
    return true;
  }

  async validationForUpdateAsync(params: Todo): Promise<boolean> {
    ValidationUtils.idControl(params.id);

    return true;
  }

  async validationForDelete(id: string): Promise<boolean> {
    ValidationUtils.idControl(id);

    const todo = await this.repository.getById(id);

    debugger;

    if (!todo?.isCompleted && todo?.todoDetails.length !== 0) {
      throw ValidationException(
        'Todonun tüm detayları tamamlanmadan silinemez',
      );
    }

    return true;
  }
}
