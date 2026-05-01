type BlogCardImageProps = {
	coverPicPath: string;
};
function BlogCardImage({ coverPicPath }: BlogCardImageProps) {
	return (
		<figure className=" aspect-video overflow-hidden">
			<img
				// src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
				src={coverPicPath}
				alt="Album"
				className="object-cover  w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
			/>
		</figure>
	);
}

export default BlogCardImage;
