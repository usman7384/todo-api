import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes'
import userRoutes from './routes/userRoutes';
import { authMiddleware } from './middleware/authMiddleware';
import { requestLogger } from './middleware/loggerMiddleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);
app.use('/api/users', authMiddleware, userRoutes);


export default app;