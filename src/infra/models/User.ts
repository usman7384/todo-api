import { Entity, PrimaryColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { TodoModel } from './Todo';
import { v4 as uuidv4 } from "uuid";
import { UserSchema } from '../validators/UserValidator';

@Entity()
export class UserModel {
    @PrimaryColumn()
    id!: string;

    @Column({ unique: true })
    googleId!: string;

    @Column()
    name!: string;

    @OneToMany(() => TodoModel, (todo) => todo.user)
    todos!: TodoModel[];

    @BeforeInsert()
    generateUuid() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    static validate(user: UserModel) {
        const result = UserSchema.safeParse(user);
        if (!result.success) {
            throw new Error(result.error.errors.map(e => e.message).join(", "));
        }
    }
}
