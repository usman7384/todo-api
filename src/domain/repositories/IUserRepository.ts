import { UserDTO } from '../../app/dto/UserDTO';
import { User } from '../entities/User';

export interface IUserRepository {
    getAll(options:{limit:number, offset:number}): Promise<User[] | null>;
    findOneUser(userId: string): Promise<User|null> ;
    saveUser(user:User):Promise<User>;
    findOneByGoogleId(userId: string): Promise<User | null>;
}
