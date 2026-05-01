import { useQuery } from "@tanstack/react-query";
import { getBlog, getBlogs } from "../utils/BlogApi";

export const useBlogs = () =>
	useQuery({
		queryKey: ["blogs"],
		queryFn: getBlogs,
	});
export const useBlog = (id: string | undefined) =>
	useQuery({
		queryKey: [`blog/${id}`],
		queryFn: () => getBlog(id!),
		enabled: !!id,
	});
