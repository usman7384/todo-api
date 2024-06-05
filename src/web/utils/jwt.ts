import jwt from 'jsonwebtoken';
import config from '../../infra/config';

export const generateToken = (user: any) => {
    return jwt.sign(user, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwtSecret);
};
