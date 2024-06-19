import { Entity, PrimaryColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { UserModel } from './User';

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
}
