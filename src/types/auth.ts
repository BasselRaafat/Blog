import type { BlogSummaryResponse } from "./blogs";

export type LoginRequest = {
	email: string;
	password: string;
};
export type ApiError = {
	message: string;
	statusCode: number;
};

export type LoginResponse = {
	id: string;
	name: string;
	email: string;
	profilePic: string;
	accessToken: string;
	refreshToken: string;
};

export type RegisterRequest = {
	name: string;
	email: string;
	password: string;
	profilePic: File | null;
};

export type UserDetails = {
	id: string;
	name: string;
	email: string;
	profilePic: string;
	Blogs: BlogSummaryResponse[];
};
export type UserSummary = {
	id: string;
	name: string;
	email: string;
	profilePic: string;
};
