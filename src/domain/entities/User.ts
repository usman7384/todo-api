import { Todo } from './Todo';

export class User {
    id: string;
    googleId: string;
    name: string;
    todos: Todo[];

    constructor(id: string, googleId: string, name: string, todos: Todo[]) {
        this.id = id;
        this.googleId = googleId;
        this.name = name;
        this.todos = todos;
    }
}
