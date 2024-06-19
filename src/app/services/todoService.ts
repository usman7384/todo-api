import "reflect-metadata";
import { injectable, inject } from 'inversify';
import UserService from './userService';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';
import { v4 as uuidv4 } from 'uuid';
import CONSTANTS from "../../shared/constants";
import { UserDTO } from '../dto/UserDTO';
import { TodoDTO } from '../dto/TodoDTO';

@injectable()
class TodoService {
    private todoRepository: ITodoRepository;
    private userService: UserService;

    constructor(
        @inject(CONSTANTS.ITodoRepository) todoRepository: ITodoRepository,
        @inject(CONSTANTS.UserService) userService: UserService
    ) {
        this.todoRepository = todoRepository;
        this.userService = userService;
    }

    async getAllTodos(options: { limit: number, offset: number }): Promise<Todo[] | null> {
        const todos = await this.todoRepository.getAll(options);
        if (!todos) {
            return null;
        }
        return todos;
    }

    async createTodo(todoData: TodoDTO, userId: string): Promise<Todo> {

        const newTodo = await this.todoRepository.createTodo(todoData);

        await this.userService.addTodoItem(userId, newTodo);

        return newTodo
    }
}

export default TodoService;
