

import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';
import { TodoModel } from '../models/Todo';
import { Repository } from 'typeorm';


export class TodoRepository implements ITodoRepository {
    private repository: Repository<TodoModel>;

    constructor(repository: Repository<TodoModel>) {
        this.repository = repository;
    }

    async getAll(options: { limit: number, offset: number }): Promise<Todo[] | null> {
        const todos = await this.repository.find();
        return todos.map(todo => new Todo(todo.id, todo.title, todo.completed));
    }

    async createTodo(todo: Todo): Promise<Todo> {
        const todoModel = new TodoModel();
        todoModel.title = todo.title;
        todoModel.completed = todo.completed;
        const savedTodo = await this.repository.save(todoModel);
        return new Todo(savedTodo.id, savedTodo.title, savedTodo.completed);
    }
}
