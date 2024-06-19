// import { Container } from 'inversify';
// import { ITodoRepository } from '../../domain/repositories/ITodoRepository';
// import { IUserRepository } from '../../domain/repositories/IUserRepository';
// import { TodoRepository } from '../repositories/todoRepository';
// import { UserRepository } from '../repositories/userRepository';
// import { TodoModel } from '../models/Todo';
// import { UserModel } from '../models/User';
// import { AppDataSource } from '../db/data-source';
// import CONSTANTS from '../../shared/constants';

// export function initializeRepositories(container: Container) {
//     const userRepository = new UserRepository(AppDataSource.getRepository(UserModel));
//     const todoRepository = new TodoRepository(AppDataSource.getRepository(TodoModel));

//     container.bind<IUserRepository>(CONSTANTS.IUserRepository).toConstantValue(userRepository);
//     container.bind<ITodoRepository>(CONSTANTS.ITodoRepository).toConstantValue(todoRepository);
// }
