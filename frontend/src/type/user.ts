export type UserRole = "admin" | "user";

export type User = { 
    _id: string;
    username: string;
    createdAt: Date;
    role: UserRole;
}