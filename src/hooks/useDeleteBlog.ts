import { useMutation } from "@tanstack/react-query";
import { deleteBlog } from "../utils/BlogApi";
import { queryClient } from "../utils/queryClinte";

export const useDeleteBlog = () =>
	useMutation({
		mutationFn: (id: string) => deleteBlog(id),
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ["blogs"],
			});
			queryClient.invalidateQueries({
				queryKey: [`blog/${data.data.id}`],
			});
		},
	});
