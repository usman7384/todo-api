import { Container } from 'inversify';
import UserService from '../../app/services/userService';
import TodoService from '../../app/services/todoService';
import { GoogleAuthService } from '../../app/services/authService';
import TYPES from '../../shared/types';

export function initializeServices(container: Container) {
    container.bind<UserService>(TYPES.UserService).to(UserService);
    container.bind<TodoService>(TYPES.TodoService).to(TodoService);
    container.bind<GoogleAuthService>(TYPES.GoogleAuthService).to(GoogleAuthService);
}
