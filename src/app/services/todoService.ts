import "reflect-metadata";
import { injectable, inject } from 'inversify';
import UserService from './userService';
import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
import { Todo } from '../../domain/entities/Todo';
import { v4 as uuidv4 } from 'uuid';
import TYPES from "../../shared/types";
import { TodoSchema } from '../../infra/validators/TodoValidator';
// import { TodoMapper } from '../mappers/TodoMapper';
import { UserDTO } from '../DTOs/UserDTO';
import { TodoDTO } from '../DTOs/TodoDTO';

@injectable()
class TodoService {
    private todoRepository: ITodoRepository;
    private userService: UserService;

    constructor(
        @inject(TYPES.ITodoRepository) todoRepository: ITodoRepository,
        @inject(TYPES.UserService) userService: UserService
    ) {
        this.todoRepository = todoRepository;
        this.userService = userService;
    }

    async getAllTodos(options: { limit: number, offset: number }): Promise<TodoDTO[] | null> {
        const todos = await this.todoRepository.getAll(options);
        if (!todos) {
            return null;
        }
        return todos.map(todo => new TodoDTO(todo.id, todo.title,todo.completed));
    }

    async createTodo(todoData: TodoDTO, userId: string): Promise<TodoDTO> {
        // const todo = TodoMapper.toEntity(todoData)
        
        const validationResult = TodoSchema.safeParse(todoData);

        if (!validationResult.success) {
            console.log(validationResult.error)
            throw new Error(validationResult.error.errors.map(e => e.message).join(", "));
        }
        const newTodo= await this.todoRepository.createTodo(todoData);

        await this.userService.addTodoItem(userId, newTodo);

        return new TodoDTO(newTodo.id, newTodo.title, newTodo.completed);    
    }
}

export default TodoService;
