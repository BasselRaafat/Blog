import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginRequest } from "../../../types/auth";
import { useLogin } from "../../../hooks/useLogin";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Login() {
	const loginMutation = useLogin();
	const {
		register,
		handleSubmit,
		// watch,
		formState: { errors },
	} = useForm<LoginRequest>();

	const onSubmit: SubmitHandler<LoginRequest> = (data) => {
		loginMutation.mutate(data);
	};
	useEffect(() => {
		if (loginMutation.error)
			toast.error("somting went wrong pleas try again later");
	}, [loginMutation.error]);
	return (
		<div>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs p-4">
				<legend className="fieldset-legend">Login</legend>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="email" className="label">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="input"
						placeholder="Email"
						{...register("email", { required: "Email is required" })}
						// onChange={handleChange}
					/>
					{errors.email && <span>{errors.email.message}</span>}

					<label className="label">Password</label>
					<input
						type="password"
						className="input"
						placeholder="Password"
						{...register("password", { required: "password is required" })}
						// onChange={handleChange}
					/>
					{errors.password && <span>{errors.password.message}</span>}
					<button
						className="btn block btn-neutral mt-4"
						disabled={loginMutation.isPending}
					>
						{loginMutation.isPending ? (
							<>
								logging in
								<span className="loading loading-spinner loading-xs"></span>
							</>
						) : (
							"Login"
						)}
					</button>
				</form>
			</fieldset>
		</div>
	);
}
