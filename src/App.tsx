import Register from "./components/features/Auth/Register";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Login from "./components/features/Auth/Login";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import AddBlog from "./pages/AddBlog";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";

function App() {
	return (
		<>
			{/* <Navbar /> */}
			{/* <BlogCard /> */}
			<ToastContainer />
			<Routes>
				<Route path="/auth" element={<Auth />}>
					<Route path="" element={<Login />}></Route>
					<Route path="register" element={<Register />}></Route>
				</Route>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/blog/:id" element={<Blog />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/blog/new" element={<AddBlog />} />
						<Route path="/blog/:id/edit" element={<AddBlog mode="edit" />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
