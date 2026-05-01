import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import {
	useCodeMirror,
	basicSetup,
	EditorView,
	ViewUpdate,
} from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubLight } from "@uiw/codemirror-theme-github";
import "github-markdown-css/github-markdown.css";

const markdownHighlightStyle = HighlightStyle.define([
	{ tag: t.heading1, fontSize: "2em", fontWeight: "bold" },
	{ tag: t.heading2, fontSize: "1.75em", fontWeight: "bold" },
	{ tag: t.heading3, fontSize: "1.5em", fontWeight: "bold" },
]);
const myTheme = EditorView.theme({
	"&": {
		backgroundColor: "transparent !important",
	},
});
type CodeEditorProps = {
	value: string | undefined;
	handleChange: (value: string, viewUpdate: ViewUpdate) => void;
};
// type CodeEditorProps = {
// 	formValue: string;
// 	hanldeChange: (
// 		e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
// 	) => void;
// };
export default function CodeEditor({ value, handleChange }: CodeEditorProps) {
	// 	{
	// 	formValue,
	// 	hanldeChange,
	// }: CodeEditorProps
	const { setContainer } = useCodeMirror({
		value,
		height: "90vh",
		extensions: [
			basicSetup(),
			markdown({
				base: markdownLanguage,
				codeLanguages: languages,
				addKeymap: true,
			}),
			syntaxHighlighting(markdownHighlightStyle),
			EditorView.lineWrapping,
			myTheme,
		],
		theme: githubLight,
		onChange: handleChange,
	});
	return (
		<div className=" ">
			<div>
				<div ref={setContainer} className="border-r" />
			</div>
		</div>
	);
}
