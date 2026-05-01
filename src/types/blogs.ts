import type { UserSummary } from "./auth";

export type BlogRequest = {
	title: string | undefined;
	description: string | undefined;
	content: string | undefined;
	coverPic: File | null | undefined;
};

export type BlogDetailsResponse = {
	id: string;
	title: string;
	description: string;
	content: string;
	coverPicPath: string;
	userId: string;
	user: UserSummary;
	createdAt: string;
};

export type BlogSummaryResponse = {
	id: string;
	title: string;
	description: string;
	coverPicPath: string;
	createdAt: string;
	userId: string;
	user: UserSummary;
};
