import { TodoDTO } from '../../app/dto/TodoDTO';
import { Todo } from '../entities/Todo';

export interface ITodoRepository {
    getAll(options: { limit: number, offset: number }): Promise<Todo[] | null>;
    createTodo(todo: TodoDTO): Promise<Todo>;
}
