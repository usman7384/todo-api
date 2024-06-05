import { z } from 'zod';
import { TodoSchema } from './TodoValidator';

export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    googleId: z.string(),
    name: z.string().min(2).max(12),
    todos: z.array(TodoSchema).optional()
});
