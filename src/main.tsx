import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { queryClient } from "./utils/queryClinte.ts";

const root = document.getElementById("root");
createRoot(root!).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</QueryClientProvider>,
);
