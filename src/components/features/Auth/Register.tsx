import type { RegisterRequest } from "../../../types/auth";
import { toFormData } from "../../../utils/toFormData";
import { useRegister } from "../../../hooks/useRegister";
import { useForm, type SubmitHandler } from "react-hook-form";

export default function Register() {
	const registerMutation = useRegister();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterRequest>();

	const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
		const fileList = data.profilePic as unknown as FileList;
		const file = fileList && fileList.length > 0 ? fileList[0] : null;

		const submitData = {
			...data,
			profilePic: file,
		};
		const formData = toFormData(submitData);
		registerMutation.mutate(formData);
	};

	return (
		<div>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs p-4">
				<legend className="fieldset-legend">Register</legend>

				<form method="post" onSubmit={handleSubmit(onSubmit)}>
					<label className="label block p-1" htmlFor="name">
						Name
					</label>
					<input
						type="text"
						className={`input block ${errors.name ? "input-error" : ""}`}
						id="name"
						placeholder="Your Name"
						{...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
					/>
					{errors.name && <span className="text-error text-sm p-1 block">{errors.name.message}</span>}

					<label className="label block p-1" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						className={`input block ${errors.email ? "input-error" : ""}`}
						id="email"
						placeholder="Email"
						{...register("email", { 
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address"
							}
						})}
					/>
					{errors.email && <span className="text-error text-sm p-1 block">{errors.email.message}</span>}

					<label htmlFor="profile-pic" className="label block p-1">
						Profile Picture
					</label>
					<input
						type="file"
						className={`file-input block ${errors.profilePic ? "file-input-error" : ""}`}
						id="profile-pic"
						accept="image/*"
						{...register("profilePic", { required: "Profile picture is required" })}
					/>
					{errors.profilePic && <span className="text-error text-sm p-1 block">{errors.profilePic.message}</span>}
					
					<label className="label block p-1" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						className={`input block ${errors.password ? "input-error" : ""}`}
						id="password"
						placeholder="Password"
						{...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
					/>
					{errors.password && <span className="text-error text-sm p-1 block">{errors.password.message}</span>}
					<button
						className="btn btn-neutral mt-4 block"
						type="submit"
						disabled={registerMutation.isPending}
					>
						{registerMutation.isPending ? "Create account" : "Register"}
					</button>
				</form>
			</fieldset>
		</div>
	);
}
