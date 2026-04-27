import client from "./client";
import type { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import type { User } from "../type/user";

export type AuthResponse = {
  message: string;
  user: User;
  token: string;
};

export const loginApi = async (input: LoginSchema) => {
  try {
    const response = await client.post<AuthResponse>("/auth/login", input);

    console.log('my response', response);

    return response.data;
  } catch (error) {
    console.error(error.response?.status, error.response?.data?.message);
    return null;
  }
};


export const registerApi = async (input: RegisterSchema) => {
  try {
    const response = await client.post<AuthResponse>("/auth/register", input);
    return response.data;
  } catch (error) {
    console.error(error.response?.status, error.response?.data?.message);
    return null;
  }
};