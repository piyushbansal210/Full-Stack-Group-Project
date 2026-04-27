import { createContext, useEffect, useState } from "react";
import type { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import type { User } from "../type/user";
import client from "../api/client";
import { loginApi, registerApi } from "../api/auth.api";

export type AuthContextType = { 
    user: User | null;
    isLoading: boolean;
    login: (data: LoginSchema) => Promise<void>;
    register: (data: RegisterSchema) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        // to do - get WHOAMI 
        //   .then((res) => setUser(res.user))
        //   .catch(() => localStorage.removeItem('token'))
        //   .finally(() => setIsLoading(false));
        setIsLoading(false);
      }, []);

      const login = async (input: LoginSchema) => {
        const response = await loginApi(input);
        if (!response) {
            return;
        }
        const { user, token } = response;
        localStorage.setItem('token', token);
        setUser(user);
      };

    //todo
    const register = async (input: RegisterSchema) => {
        
        const response = await registerApi(input);
        if (!response) {
            return;
        }
        const { user, token } = response;
        localStorage.setItem('token', token);
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}