import { useCreateBlog } from "../../../hooks/useCreateBlog";
import { useUpdateBlog } from "../../../hooks/useUpdateBlog";
import type { BlogRequest } from "../../../types/blogs";
import { toFormData } from "../../../utils/toFormData";
import { useBlog } from "../../../hooks/useBlogs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import CodeEditor from "./CodeEditor";

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

	const [form, setForm] = useState<BlogRequest>({
		title: data?.title ?? "",
		description: data?.description ?? "",
		content: data?.content ?? "",
		coverPic: undefined,
	});

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setForm({
			title: data?.title ?? "",
			description: data?.description ?? "",
			content: data?.content ?? "",
			coverPic: null,
		});
		setImageSrc(data?.coverPicPath);
	}, [data]);

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
	const handleEditorChange = (value: string) => {
		const newForm = { ...form, content: value };
		setForm(newForm);
	};
	const hanldeChange = (
		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		const { value, name, type, files } = e.target;
		const newForm = {
			...form,
			[name]: type === "file" ? (files?.[0] ?? null) : value,
		};
		if (type === "file" && files?.[0]) {
			const file = files[0];
			const imgUrl = URL.createObjectURL(file);
			setImageSrc((prev) => {
				if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
				return imgUrl;
			});
		}

		setForm(newForm);
	};
	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form);

		const formData = toFormData(form);
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
			<form action="" onSubmit={handleSubmit}>
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
					name="coverPic"
					className="block file-input mb-4"
					onChange={hanldeChange}
					hidden={true}
				/>
				<input
					type="text"
					name="title"
					// {...register("title")}
					id="title"
					onChange={hanldeChange}
					className="block w-full text-6xl p-4 outline-none"
					placeholder="Title"
					value={form.title}
				/>
				{/* <label htmlFor="description" className="mb-2">
					description
				</label> */}
				<input
					type="text"
					name="description"
					// {...register("description")}
					id="description"
					onChange={hanldeChange}
					className="block w-full text-4xl p-4 outline-none"
					placeholder="Description"
					value={form.description}
				/>
				<CodeEditor handleChange={handleEditorChange} value={form.content} />
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
