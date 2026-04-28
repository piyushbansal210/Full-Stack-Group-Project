import client from "./client";
import type { LoginSchema, RegisterSchema } from "../schema/auth.schema";
import type { User } from "../type/user";

export type AuthResponse = {
  message: string;
  user: User;
  token: string;
};

export const loginApi = async (input: LoginSchema) => {
  const { data } = await client.post<AuthResponse>("/auth/login", input);
  return data;
};


export const registerApi = async (input: RegisterSchema) => {
  const { data } = await client.post<AuthResponse>("/auth/register", input);
  return data;
};

export const whoamiApi = async (): Promise<{ user: User }> => {
  const { data } = await client.get<{ user: User }>("/auth/whoami");
  return data;
}