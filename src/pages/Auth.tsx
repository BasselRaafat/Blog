import { Link, Outlet, useLocation } from "react-router";

export default function Auth() {
	const location = useLocation();
	return (
		<div className="min-h-screen flex items-center justify-center bg-base-100">
			<div className="card w-full max-w-sm shadow-2xl bg-base-200">
				<div className="card-body">
					<Outlet></Outlet>
					<div>
						{location.pathname === "/auth/register" ? (
							<p>
								Already have an account
								<Link to="/auth" className="text-blue-400 underline">
									{" "}
									Login
								</Link>
							</p>
						) : (
							<p>
								Don't have an account?{" "}
								<Link to="/auth/register" className="text-blue-400 underline">
									{" "}
									Create One
								</Link>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
