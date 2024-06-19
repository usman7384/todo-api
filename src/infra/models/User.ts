import { Entity, PrimaryColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { TodoModel } from './Todo';

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

}
