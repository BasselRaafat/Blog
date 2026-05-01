import { useNavigate } from "react-router";
import type { BlogSummaryResponse } from "../../types/blogs";
import DeleteIcon from "./DeleteIcon";
import DeleteModal from "./DeleteModal";
import EditIcon from "./EditIcon";

type EditAndDeleteIconsProps = {
	blog: BlogSummaryResponse;
	handleDelete: (
		id: string,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
};
function EditAndDeleteIcons({ blog, handleDelete }: EditAndDeleteIconsProps) {
	const navigate = useNavigate();
	const handleEditNavigation = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		e.stopPropagation();
		navigate(`/blog/${blog.id}/edit`);
	};
	return (
		<div className="flex  gap-2">
			<div onClick={handleEditNavigation}>
				<EditIcon />
			</div>
			<div>
				<button
					onClick={(e) => {
						e.stopPropagation();
						const modal = document.getElementById(
							"my-modal",
						) as HTMLDialogElement;

						modal.showModal();
					}}
				>
					<DeleteIcon />
				</button>
				<DeleteModal id={blog.id} handleDelete={handleDelete} />
			</div>
		</div>
	);
}

export default EditAndDeleteIcons;
