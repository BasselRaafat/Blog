import type { ApiError, LoginRequest, LoginResponse } from "../types/auth";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { postLogin } from "../utils/authApi";
import { useNavigate } from "react-router";

export const useLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	return useMutation<LoginResponse, ApiError, LoginRequest>({
		mutationFn: postLogin,
		onSuccess(resBody) {
			dispatch(logIn(resBody));
			navigate("/", {
				replace: true,
			});
		},
	});
};
