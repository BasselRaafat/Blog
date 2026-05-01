import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../utils/authApi";
import { useNavigate } from "react-router";

export const useRegister = () => {
	const naviation = useNavigate();
	return useMutation({
		mutationFn: postRegister,
		onSuccess() {
			naviation("/auth", {
				replace: true,
			});
		},
	});
};
