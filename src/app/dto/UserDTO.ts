import { z } from 'zod';

export class UserDTO {
    name: string;

    private constructor(name: string) {
        this.name = name;
    }

    static create(input: unknown): UserDTO {
        const parsed = UserSchema.safeParse(input);

        if (!parsed.success) {
            throw new Error(`Validation error: ${parsed.error.message}`);
        }

        const {  name } = parsed.data;
        return new UserDTO(name);
    }
}

const UserSchema = z.object({
    name: z.string().min(1, "Name is required"),
});