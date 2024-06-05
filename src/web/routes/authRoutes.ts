import { Router } from 'express';
import { getGoogleAuthURL, handleGoogleAuthCallback } from '../controllers/authController';

const router = Router();

router.get('/google', getGoogleAuthURL);
router.get('/google/callback', handleGoogleAuthCallback);

export default router;
