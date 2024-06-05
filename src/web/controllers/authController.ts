import { Request, Response } from 'express';
import { GoogleAuthService } from '../../app/services/authService';
import { container } from '../../infra/DI_Container/inversify.config';
import TYPES from "../../shared/types";


const googleAuthService = container.get<GoogleAuthService>(TYPES.GoogleAuthService);

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
