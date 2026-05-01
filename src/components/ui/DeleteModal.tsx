type DeleteModalProps = {
	handleDelete: (
		id: string,
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	id: string;
};
function DeleteModal({ handleDelete, id }: DeleteModalProps) {
	return (
		<dialog id="my-modal" className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg">Delete Blog</h3>
				<p className="py-4">Are you sure you want to delete that blog</p>
				<div className="modal-action">
					<form method="dialog">
						<div className="flex gap-2">
							<button className="btn" onClick={(e) => e.stopPropagation()}>
								Close
							</button>
							<button
								className="btn bg-red-600"
								onClick={(e) => handleDelete(id, e)}
							>
								Delete
							</button>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	);
}

export default DeleteModal;
