import { Link, NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import User from "../ui/User";
import { logOut } from "../../redux/slices/userSlice";

export default function Navbar() {
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logOut());
		navigate("/auth", { replace: true });
	};
	return (
		<div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md shadow-sm border-b border-base-200">
			<div className="navbar max-w-5xl mx-auto px-4">
				<div className="navbar-start">
					<div className="dropdown">
						<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={-1}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
						>
							<li>
								<NavLink
									to="/"
									className={({ isActive }) => (isActive ? "font-bold" : "")}
								>
									Home
								</NavLink>
								<NavLink
									to="/blog/new"
									className={({ isActive }) => (isActive ? "font-bold" : "")}
								>
									Create Blog
								</NavLink>
							</li>
						</ul>
					</div>
					<Link to="/" className="btn btn-ghost text-xl">
						Journal
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) => (isActive ? "font-bold" : "")}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/blog/new"
								className={({ isActive }) => (isActive ? "font-bold" : "")}
							>
								Create Blog
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="navbar-end">
					<div>
						{user ? (
							<div className="flex gap-2">
								<User />
								<button className="btn btn-error btn-sm" onClick={handleLogout}>
									Logout
								</button>
							</div>
						) : (
							<Link to="/auth">
								<button className="btn btn-primary">Login</button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
