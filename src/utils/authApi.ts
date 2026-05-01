import type { LoginRequest, LoginResponse } from "../types/auth";
import { api } from "./apiInstance";

export const postRegister = (register: FormData) =>
	api.post("/auth/register", register);

export const postLogin = async (login: LoginRequest) => {
	const { data } = await api.post<LoginResponse>("/auth/login", login);
	return data;
};
