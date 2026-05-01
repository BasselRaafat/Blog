import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

export function ProtectedRoute() {
	const username = useAppSelector((state) => state.user);

	if (!username) {
		return <Navigate to="/auth" replace />;
	}
	return <Outlet />;
}
