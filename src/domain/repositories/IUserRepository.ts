import { User } from '../entities/User';

export interface IUserRepository {
    getAll(options:{limit:number, offset:number}): Promise<User[] | null>;
    createUser(user: User): Promise<User>;
    findOneUser(userId: string): Promise<User|null> ;
    saveUser(user:User):Promise<User>;
    findOneByGoogleId(userId: string): Promise<User | null>;
}
