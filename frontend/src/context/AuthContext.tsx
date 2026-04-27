import { createContext, useEffect, useState } from "react";
import type { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import type { User } from "../type/user";
import { loginApi, registerApi, whoamiApi } from "../api/auth.api";

export type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (data: LoginSchema) => Promise<void>;
    register: (data: Omit<RegisterSchema, 'confirmPassword'>) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }
        whoamiApi()
            .then((res) => setUser(res.user))
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (input: LoginSchema) => {
        const { user, token } = await loginApi(input);
        localStorage.setItem('token', token);
        setUser(user);
    };

    const register = async (input: Omit<RegisterSchema, 'confirmPassword'>) => {
        const { user, token } = await registerApi({ ...input, confirmPassword: input.password });
        localStorage.setItem('token', token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};