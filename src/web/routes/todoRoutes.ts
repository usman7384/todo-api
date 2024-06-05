import { Router } from 'express';
import { getTodos, createTodo } from '../controllers/todoController';
import { paginate } from '../middleware/paginationMiddleware';

const router = Router();

router.get('/', paginate(),getTodos);
router.post('/', createTodo);

export default router;
