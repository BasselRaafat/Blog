import { useNavigate } from "react-router";
import { useAppSelector } from "../../../redux/hooks";
import type { BlogSummaryResponse } from "../../../types/blogs";
import BlogCardImage from "../../ui/BlogCardImage";
import EditAndDeleteIcons from "../../ui/EditAndDeleteIcons";

type PostCardProp = {
	blog: BlogSummaryResponse;
	handleDelete: (
		id: string,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
};
export default function BlogCard({ blog, handleDelete }: PostCardProp) {
	const user = useAppSelector((state) => state.user);
	const navigate = useNavigate();

	const handleMainBlogNavigation = () => {
		navigate(`/blog/${blog.id}`);
	};
	return (
		<div
			className="card group bg-base-100 shadow-sm hover:shadow-xl border border-base-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
			onClick={handleMainBlogNavigation}
		>
			<BlogCardImage coverPicPath={blog.coverPicPath} />
			<div className="card-body ">
				<div className="flex justify-between items-center">
					<h2 className="card-title text-2xl font-bold group-hover:text-primary transition-colors">
						{blog.title}
					</h2>
					{user?.id === blog.userId && (
						<EditAndDeleteIcons blog={blog} handleDelete={handleDelete} />
					)}
				</div>
				<p className="text-gray-500 line-clamp-2 mt-2">{blog.description}</p>
				<div className="flex justify-between items-center w-full">
					<div className="flex items-center gap-3">
						<img
							className="mask mask-circle size-10 object-cover"
							src={blog.user.profilePic}
						/>
						<p className="font-medium text-sm text-neutral-600">{blog.user.name}</p>
					</div>
					<div className="text-sm text-neutral-400 font-medium">
						<p className="w-fit">{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
