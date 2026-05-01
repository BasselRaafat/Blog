import BlogForm from "../components/features/post/BlogForm";
type AddBlogProp = {
	mode?: string;
};
export default function AddBlog({ mode }: AddBlogProp) {
	return (
		<div className="w-[80%] m-auto mt-8">
			<BlogForm mode={mode} />
		</div>
	);
}
