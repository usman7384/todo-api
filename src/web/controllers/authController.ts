import { Request, Response } from 'express';
import { GoogleAuthService } from '../../app/services/authService';
import { container } from '../../infra/di/inversify.config';
import CONSTANTS from "../../shared/constants";


const googleAuthService = container.get<GoogleAuthService>(CONSTANTS.GoogleAuthService);

export const getGoogleAuthURL = (req: Request, res: Response) => {
    try {
        const url = GoogleAuthService.getAuthURL();
        res.json({ url });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const handleGoogleAuthCallback = async (req: Request, res: Response) => {
    try {
        const { code } = req.query;
        const token = await googleAuthService.handleAuthCallback(code as string);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
