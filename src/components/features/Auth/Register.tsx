import type { RegisterRequest } from "../../../types/auth";
import { toFormData } from "../../../utils/toFormData";
import { useRegister } from "../../../hooks/useRegister";
import { useState } from "react";

export default function Register() {
	const [form, setForm] = useState<RegisterRequest>({
		email: "",
		name: "",
		password: "",
		profilePic: null,
	});
	const registerMutation = useRegister();

	const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = toFormData(form);
		registerMutation.mutate(formData);
	};
	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		const { value, name, type, files } = e.target;
		const newForm = {
			...form,
			[name]: type === "file" ? (files?.[0] ?? null) : value,
		};

		setForm(newForm);
	};
	// const {
	// 	register,
	// 	handleSubmit,
	// 	// watch,
	// 	formState: { errors },
	// } = useForm<RegisterRequest>();
	// if (registerMutation.isError)
	// 	toast.error("something went wrong please try again");
	return (
		<div>
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs p-4">
				<legend className="fieldset-legend">Register</legend>

				<form method="post" onSubmit={onSubmit}>
					<label className="label" htmlFor="name">
						Name
					</label>
					<input
						type="text"
						className="input block"
						id="name"
						placeholder="Your Name"
						// {...register("name")}
						onChange={handleOnChange}
						name="name"
					/>
					{/* {errors.name && <span>{errors.name.message}</span>} */}

					<label className="label" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						className="input block"
						id="email"
						placeholder="Email"
						// {...register("email")}
						onChange={handleOnChange}
						name="email"
					/>
					{/* {errors.email && <span>{errors.email.message}</span>} */}

					<label htmlFor="profile-pic" className="label">
						Profile Picture
					</label>
					<input
						type="file"
						className="file-input block"
						id="profile-pic"
						accept="image/*"
						// {...register("profilePic")}
						onChange={handleOnChange}
						name="profilePic"
					/>
					{/* {errors.profilePic && <span>{errors.profilePic.message}</span>} */}
					<label className="label" htmlFor="password">
						Password
					</label>

					<input
						type="password"
						className="input block"
						id="password"
						placeholder="Password"
						// {...register("password")}
						onChange={handleOnChange}
						name="password"
					/>

					{/* {errors.password && <span>{errors.password.message}</span>} */}
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
