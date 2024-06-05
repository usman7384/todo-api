import { z } from 'zod';

export const TodoSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1, "Title is required"),
    completed: z.boolean(),
});