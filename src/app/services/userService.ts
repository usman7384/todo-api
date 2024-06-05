import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { Todo } from '../../domain/entities/Todo';
import { User } from '../../domain/entities/User';
import { v4 as uuidv4 } from 'uuid';
import TYPES from "../../shared/types";
import { UserSchema } from '../../infra/validators/UserValidator';
import { TodoSchema } from '../../infra/validators/TodoValidator';
// import { UserMapper } from '../mappers/UserMapper';
import { UserDTO } from '../DTOs/UserDTO';
import { TodoDTO } from '../DTOs/TodoDTO';

@injectable()
class UserService {
    private userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(options: { limit: number, offset: number }): Promise<UserDTO[] | null> {
        const users = await this.userRepository.getAll(options);
        if (!users) {
            return null;
        }
        return users.map(user => new UserDTO(user.id, user.googleId, user.name, user.todos));
    }

    async createUser(userData: UserDTO): Promise<UserDTO> {
        // const user = UserMapper.toEntity(userData)
        
        const validationResult = UserSchema.safeParse(userData);
        if (!validationResult.success) {
            throw new Error(validationResult.error.errors.map(e => e.message).join(", "));
        }

        const createdUser = await this.userRepository.createUser(userData);

        return new UserDTO(createdUser.id,createdUser.googleId, createdUser.name,createdUser.todos);
    }

    async getUserById(userId: string): Promise<UserDTO | null> {
        const user = await this.userRepository.findOneUser(userId);
        if (!user) {
            return null;
        }
        return new UserDTO(user.id,user.googleId, user.name,user.todos);
    }

    async addTodoItem(userId: string, todoData: Todo): Promise<UserDTO | null> {

        const validationResult = TodoSchema.safeParse(todoData);
        if (!validationResult.success) {
            throw new Error(validationResult.error.errors.map(e => e.message).join(", "));
        }

        const user = await this.userRepository.findOneUser(userId);
        if (user) {
            if (!user.todos) {
                user.todos = [];
            }
            user.todos.push(todoData);
            const updatedUser = await this.userRepository.saveUser(user);
            return new UserDTO(updatedUser.id,updatedUser.googleId, updatedUser.name,updatedUser.todos);;
        }
        return null;
    }
}

export default UserService;
