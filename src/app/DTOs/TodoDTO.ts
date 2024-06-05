export class TodoDTO {
    id: string;
    title: string;
    completed: boolean;

    constructor(id: string, title: string, completed: boolean) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}
