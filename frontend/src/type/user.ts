export type UserRole = "admin" | "user";

export type User = {
    _id: string;
    username: string;
    createdAt: string;
    role: UserRole;
};