import { Entity, PrimaryColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { UserModel } from './User';
import { v4 as uuidv4 } from "uuid";
import { TodoSchema } from '../validators/TodoValidator';

@Entity()
export class TodoModel {
    @PrimaryColumn()
    id!: string;

    @Column({ default: '' })
    title!: string;

    @Column({ default: false })
    completed!: boolean;

    @ManyToOne(() => UserModel, (user) => user.todos)
    user!: UserModel;

    @BeforeInsert()
    generateUuid() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    static validate(todo: TodoModel) {
        const result = TodoSchema.safeParse(todo);
        if (!result.success) {
            throw new Error(result.error.errors.map(e => e.message).join(", "));
        }
    }
}
