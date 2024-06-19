import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { Todo } from '../../domain/entities/Todo';
import { User } from '../../domain/entities/User';
import { v4 as uuidv4 } from 'uuid';
import CONSTANTS from "../../shared/constants";
import { UserDTO } from '../dto/UserDTO';
import { TodoDTO } from '../dto/TodoDTO';

@injectable()
class UserService {
    private userRepository: IUserRepository;

    constructor(@inject(CONSTANTS.IUserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(options: { limit: number, offset: number }): Promise<User[] | null> {
        const users = await this.userRepository.getAll(options);
        if (!users) {
            return null;
        }
        return users;
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOneUser(userId);
        if (!user) {
            return null;
        }
        return user;
    }

    async addTodoItem(userId: string, todoData: Todo): Promise<User | null> {

        const user = await this.userRepository.findOneUser(userId);
        if (user) {
            if (!user.todos) {
                user.todos = [];
            }
            user.todos.push(todoData);
            const updatedUser = await this.userRepository.saveUser(user);
            return updatedUser;
        }
        return null;
    }

}

export default UserService;
