import { useAppSelector } from "../../redux/hooks";

export default function User() {
	const user = useAppSelector((state) => state.user);
	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex items-center gap-2">
				<img className="mask mask-circle size-8" src={user?.profilePic} />
				<p>{user?.name}</p>
			</div>
		</div>
	);
}
