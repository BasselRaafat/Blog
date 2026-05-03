import { useCreateBlog } from "../../../hooks/useCreateBlog";
import { useUpdateBlog } from "../../../hooks/useUpdateBlog";
import type { BlogRequest } from "../../../types/blogs";
import { toFormData } from "../../../utils/toFormData";
import { useBlog } from "../../../hooks/useBlogs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import CodeEditor from "./CodeEditor";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

type BlogFormProp = {
	mode?: string;
};
export default function BlogForm({ mode }: BlogFormProp) {
	const { id } = useParams();
	const postMutation = useCreateBlog();
	const patchMutation = useUpdateBlog();
	const { data, isLoading, error } = useBlog(id);

	const [imgSrc, setImageSrc] = useState<string | null | undefined>(
		data?.coverPicPath ?? null,
	);

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<BlogRequest>({
		defaultValues: {
			title: "",
			description: "",
			content: "",
			coverPic: undefined,
		}
	});

	useEffect(() => {
		if (data) {
			reset({
				title: data.title ?? "",
				description: data.description ?? "",
				content: data.content ?? "",
				coverPic: null,
			});
			setImageSrc(data.coverPicPath);
		}
	}, [data, reset]);

	//-----------------------------------Use Effect
	useEffect(() => {
		if (patchMutation.error)
			toast.error(`Something went wrong: ${patchMutation.error.message}`);
	}, [patchMutation.error]);
	useEffect(() => {
		if (postMutation.error)
			toast.error(`Something went wrong: ${postMutation.error.message}`);
	}, [postMutation.error]);

	//-------------------------------------Handlers
	const coverPicRegister = register("coverPic", { required: mode === "edit" ? false : "Cover picture is required" });

	const onSubmit: SubmitHandler<BlogRequest> = (formDataRHF) => {
		const fileList = formDataRHF.coverPic as unknown as FileList;
		const file = fileList && fileList.length > 0 ? fileList[0] : null;

		const submitData = {
			...formDataRHF,
			coverPic: file,
		};
		const formData = toFormData(submitData);
		if (mode === "edit" && id) patchMutation.mutate({ id, formData });
		else postMutation.mutate(formData);
	};

	if (mode === "edit" && isLoading)
		return (
			<div className="w-full h-[90vh] flex justify-center items-center">
				<span className="loading loading-spinner loading-s "></span>
			</div>
		);
	if (error)
		return (
			<div className="h-[90hv] w-screen flex justify-center items-center">
				Something went wrong, blease try again
			</div>
		);

	return (
		<div>
			<form action="" onSubmit={handleSubmit(onSubmit)}>
				{/* {!id ? ( */}
				{/* <> */}
				<label htmlFor="img" className="mb-2">
					<div className="w-screen relative left-1/2 -translate-x-1/2 mb-10">
						{imgSrc ? (
							<img
								src={imgSrc}
								alt=""
								className="w-full h-72 md:h-96 object-cover"
							/>
						) : (
							<div className="w-full h-72 md:h-96 flex justify-center items-center bg-gray-300">
								Select a Cover Pictrue for your blog
							</div>
						)}
					</div>
				</label>
				<input
					type="file"
					id="img"
					accept="image/*"
					className="block file-input mb-4"
					hidden={true}
					{...coverPicRegister}
					onChange={(e) => {
						coverPicRegister.onChange(e);
						const files = e.target.files;
						if (files?.[0]) {
							const file = files[0];
							const imgUrl = URL.createObjectURL(file);
							setImageSrc((prev) => {
								if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
								return imgUrl;
							});
						}
					}}
				/>
				{errors.coverPic && <span className="text-error text-sm block text-center w-full mb-4">{errors.coverPic.message}</span>}
				<input
					type="text"
					id="title"
					className={`block w-full text-6xl p-4 outline-none ${errors.title ? "text-red-500 placeholder-red-300" : ""}`}
					placeholder="Title"
					{...register("title", { required: "Title is required", minLength: { value: 5, message: "Title must be at least 5 characters" } })}
				/>
				{errors.title && <span className="text-error text-sm ml-4">{errors.title.message}</span>}

				{/* <label htmlFor="description" className="mb-2">
					description
				</label> */}
				<input
					type="text"
					id="description"
					className={`block w-full text-4xl p-4 outline-none ${errors.description ? "text-red-500 placeholder-red-300" : ""}`}
					placeholder="Description"
					{...register("description", { required: "Description is required", minLength: { value: 10, message: "Description must be at least 10 characters" } })}
				/>
				{errors.description && <span className="text-error text-sm ml-4 mb-4 block">{errors.description.message}</span>}

				<div className={errors.content ? "border-2 border-error p-1 rounded" : ""}>
					<Controller
						name="content"
						control={control}
						rules={{ required: "Content is required", minLength: { value: 20, message: "Content must be at least 20 characters" } }}
						render={({ field }) => (
							<CodeEditor handleChange={field.onChange} value={field.value as string} />
						)}
					/>
				</div>
				{errors.content && <span className="text-error text-sm mt-1 block">{errors.content.message}</span>}
				<div className="w-full flex justify-center items-center">
					<button
						className="btn m-4 bg-green-300"
						type="submit"
						disabled={isLoading}
					>
						{mode === "edit" ? (
							patchMutation.isPending ? (
								<>
									Saving Edit
									<span className="loading loading-spinner loading-xs"></span>
								</>
							) : (
								"Save Edit"
							)
						) : postMutation.isPending ? (
							<>
								Publishing Blog
								<span className="loading loading-spinner loading-xs"></span>
							</>
						) : (
							"Publish Blog"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
