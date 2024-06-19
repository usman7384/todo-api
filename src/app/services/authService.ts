import "reflect-metadata";
import { injectable, inject } from 'inversify';
import { getGoogleAuthURL, getGoogleUser } from '../../web/utils/googleOAuth';
import { User } from '../../domain/entities/User';
import { generateToken } from '../utils/jwt';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { v4 as uuidv4 } from 'uuid';
import CONSTANTS from "../../shared/constants";

@injectable()
export class GoogleAuthService {
    private userRepository: IUserRepository;

    constructor(@inject(CONSTANTS.IUserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    static getAuthURL() {
        return getGoogleAuthURL();
    }

    async handleAuthCallback(code: string) {
        const googleUser = await getGoogleUser(code);
        let user = await this.userRepository.findOneByGoogleId(googleUser.id) as User;

        if (!user) {
            user = new User(uuidv4(), googleUser.id, googleUser.name, []);
            await this.userRepository.saveUser(user);
        }

        const token = generateToken({ id: user.id, googleId: user.googleId, name: user.name });
        return token;
    }
}
