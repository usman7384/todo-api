import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserModel } from '../models/User';
import { User } from '../../domain/entities/User';
import { Todo } from '../../domain/entities/Todo'
import { UserDTO } from '../../app/dto/UserDTO';


export class UserRepository implements IUserRepository {
    private repository: Repository<UserModel>;

    constructor(repository: Repository<UserModel>) {
        this.repository = repository;
    }

    async getAll(options: { limit: number; offset: number }): Promise<User[] | null> {
        const users = await this.repository.find({
            relations: ['todos'],
           
        });
        return users.map(user => new User(
            user.id,
            user.googleId,
            user.name,
            user.todos.map(todo => new Todo(
                todo.id,
                todo.title,
                todo.completed
            ))
        ));
    }

    async findOneUser(userId: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: { id: userId },
            relations: ['todos'] 
        });
        if (!user) return null;
        return new User(
            user.id,
            user.googleId,
            user.name,
            user.todos.map(todo => new Todo(
                todo.id,
                todo.title,
                todo.completed
            ))
        );
    }

    async findOneByGoogleId(userId: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: { googleId: userId },
            relations: ['todos']
        });
        if (!user) return null;
        return new User(
            user.id,
            user.googleId,
            user.name,
            user.todos.map(todo => new Todo(
                todo.id,
                todo.title,
                todo.completed
            ))
        );
    }


    async saveUser(user: User): Promise<User> {
        const savedUser = await this.repository.save(user);
        return new User(
            savedUser.id,
            savedUser.googleId,
            savedUser.name,
            savedUser.todos.map(todo => new Todo(
                todo.id,
                todo.title,
                todo.completed
            ))
        );
    }
}
