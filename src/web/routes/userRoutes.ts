import { Router } from 'express';
import { getUser , getUsers} from '../controllers/userController';
import { paginate } from '../middleware/paginationMiddleware';

const router = Router();

router.get('/me', getUser); 
router.get('/all', paginate(),getUsers)

export default router;
