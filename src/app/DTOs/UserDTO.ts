import { TodoDTO } from './TodoDTO';

export class UserDTO {
    id: string;
    googleId: string;
    name: string;
    todos: TodoDTO[];

    constructor(id: string, googleId: string, name: string, todos: TodoDTO[]) {
        this.id = id;
        this.googleId = googleId;
        this.name = name;
        this.todos = todos;
    }
}
