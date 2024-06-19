import { z } from 'zod';


export class TodoDTO {
    title: string;
    completed: boolean;

    private constructor(title: string, completed: boolean) {
        this.title = title;
        this.completed = completed;
    }

    static create(input: unknown): TodoDTO {
        const parsed = TodoSchema.safeParse(input);

        if (!parsed.success) {
            throw new Error(`Validation error: ${parsed.error.message}`);
        }

        const { title, completed } = parsed.data;
        return new TodoDTO(title, completed);
    }
}

export const TodoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    completed: z.boolean(),
});
