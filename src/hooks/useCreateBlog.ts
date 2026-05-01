import { useMutation } from "@tanstack/react-query";
import { postBlog } from "../utils/BlogApi";
import { useNavigate } from "react-router";
import { queryClient } from "../utils/queryClinte";

export const useCreateBlog = () => {
	const naviation = useNavigate();
	return useMutation({
		mutationFn: postBlog,
		onError(err) {
			console.log(err);
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
			naviation("/", { replace: true });
		},
	});
};
