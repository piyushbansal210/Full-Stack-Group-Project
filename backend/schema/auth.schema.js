import z from "zod";

const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
})


const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8)
})

export const authSchema = {
    loginSchema,
    registerSchema,
}