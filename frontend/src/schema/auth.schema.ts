import z from "zod";

const loginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(20),
})


const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be less than 20 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const authSchema = {
    loginSchema,
    registerSchema,
}

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;