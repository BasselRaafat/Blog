import { useMutation } from "@tanstack/react-query";
import { patchBlog } from "../utils/BlogApi";
import { useNavigate } from "react-router";
import { queryClient } from "../utils/queryClinte";

type MutationPrams = {
	id: string;
	formData: FormData;
};
export const useUpdateBlog = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: ({ id, formData }: MutationPrams) => patchBlog(id, formData),
		onError(err) {
			console.log(err);
		},
		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: ["blogs"],
			});
			queryClient.invalidateQueries({
				queryKey: [`blog/${data.data.id}`],
			});
			navigate("/");
		},
	});
};
