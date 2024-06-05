// import 'reflect-metadata';
// import { Container } from 'inversify';
// import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
// import { IUserRepository } from '../../domain/repositories/IUserRepository';
// import { TodoRepository } from '../repositories/todoRepository';
// import { UserRepository } from '../repositories/userRepository';
// import { TodoModel } from '../models/Todo';
// import { UserModel } from '../models/User';
// import { AppDataSource } from '../db/data-source';
// import UserService from '../../app/services/userService';
// import TodoService from '../../app/services/todoService';
// import { GoogleAuthService } from '../../app/services/authService';
// import TYPES from '../../shared/types';


// const container = new Container();

// const userRepository = new UserRepository(AppDataSource.getRepository(UserModel));
// const todoRepository = new TodoRepository(AppDataSource.getRepository(TodoModel));

// container.bind<IUserRepository>(TYPES.IUserRepository).toConstantValue(userRepository);
// container.bind<ITodoRepository>(TYPES.ITodoRepository).toConstantValue(todoRepository);

// container.bind<UserService>(TYPES.UserService).to(UserService);
// container.bind<TodoService>(TYPES.TodoService).to(TodoService);
// container.bind<GoogleAuthService>(TYPES.GoogleAuthService).to(GoogleAuthService);

// export { container };

import CustomContainer from './customContainer';

const customContainer = new CustomContainer();
const container = customContainer.getContainer();


export {container}

