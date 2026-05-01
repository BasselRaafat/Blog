import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getBlog } from "../utils/BlogApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
	code({ node, inline, className, children, ...props }) {
		const match = /language-(\w+)/.exec(className || "");
		return !inline && match ? (
			<SyntaxHighlighter
				style={oneLight}
				language={match[1]}
				PreTag="div"
				className="rounded-lg text-sm my-4 border border-neutral-200"
				{...props}
			>
				{String(children).replace(/\n$/, "")}
			</SyntaxHighlighter>
		) : (
			<code
				className="bg-neutral-100 text-rose-600 text-sm px-1.5 py-0.5 rounded font-mono"
				{...props}
			>
				{children}
			</code>
		);
	},
};
export default function Blog() {
	const param = useParams();
	const { data, isPending, error } = useQuery({
		queryKey: [`blog/${param.id}`],
		queryFn: () => getBlog(param.id ?? ""),
		staleTime: 1000 * 60 * 5,
	});
	if (error)
		return <p>Something went wrong please try again {error.message} </p>;
	if (isPending)
		return (
			<div className="w-full h-[90vh] flex justify-center items-center">
				<span className="loading loading-spinner loading-s "></span>
			</div>
		);
	return (
		<div className="max-w-3xl mx-auto pb-16 fadeIn max-lg:m-auto max-lg:w-[80%]">
			<div className="w-screen relative left-1/2 -translate-x-1/2 mb-10">
				<img
					src={data?.coverPicPath}
					alt=""
					className="w-full h-72 md:h-96 object-cover"
				/>
			</div>

			<div className="mb-10 px-4 md:px-0">
				<h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 leading-tight mb-3 newsreader">
					{data?.title}
				</h1>
				<p className="text-lg text-neutral-500 leading-relaxed inter">
					{data?.description}
				</p>
			</div>

			<hr className="border-neutral-200 mb-10" />

			<div className="">
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					components={components}
				>
					{data?.content}
				</ReactMarkdown>
			</div>
		</div>
	);
}
