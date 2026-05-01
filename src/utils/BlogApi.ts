import type { BlogDetailsResponse, BlogSummaryResponse } from "../types/blogs";
import { api } from "./apiInstance";

export const postBlog = (blog: FormData) => api.post("/blogs", blog);
export const patchBlog = (id: string, blog: FormData) =>
	api.patch<BlogDetailsResponse>(`/blogs/${id}`, blog);
export const getBlogs = () => api.get<BlogSummaryResponse[]>("/blogs");
export const getBlog = async (id: string) => {
	const { data } = await api.get<BlogDetailsResponse>(`/blogs/${id}`);
	return data;
};
export const deleteBlog = async (id: string) => {
	const { data } = await api.delete(`/blogs/${id}`);
	return data;
};
