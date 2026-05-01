import BlogCard from "../components/features/post/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { useDeleteBlog } from "../hooks/useDeleteBlog";

export default function Home() {
	const { data, isPending, error } = useBlogs();
	const deleteMutation = useDeleteBlog();
	const handleDelete = (
		id: string,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();
		deleteMutation.mutate(id);
	};
	if (error)
		return (
			<div className="h-[90hv] w-screen flex justify-center items-center">
				Something went wrong, blease try again {error.message}
			</div>
		);
	if (isPending)
		return (
			<div className="w-full h-[90vh] flex justify-center items-center">
				<span className="loading loading-spinner loading-s "></span>
			</div>
		);

	return (
		<div className="max-w-3xl w-full mx-auto px-4 py-8 flex flex-col gap-8">
			{data?.data.map((blog) => {
				return (
					<BlogCard key={blog.id} blog={blog} handleDelete={handleDelete} />
				);
			})}
		</div>
	);
}
