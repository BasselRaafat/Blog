import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

export const api = axios.create({
	// baseURL: "https://blog-backend-fawn-six.vercel.app/api",
	baseURL: "https://blog-backend-fawn-six.vercel.app/api",
	timeout: 5000,
	withCredentials: true,
});
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
interface QueueItem {
	resolve: (token: string) => void;
	reject: (error: unknown) => void;
}

interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}
let isRefreshing = false;
let queue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null): void => {
	queue.forEach(({ resolve, reject }) =>
		error ? reject(error) : resolve(token!),
	);
	queue = [];
};
api.interceptors.response.use(
	(res) => res,
	async (error: AxiosError) => {
		const original = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status !== 401 || original._retry) {
			return Promise.reject(error);
		}

		if (isRefreshing) {
			return new Promise<string>((resolve, reject) => {
				queue.push({ resolve, reject });
			}).then((token) => {
				original.headers.Authorization = `Bearer ${token}`;
				return api(original);
			});
		}

		original._retry = true;
		isRefreshing = true;

		try {
			const { data } = await api.post<RefreshResponse>("/auth/refresh", {
				refreshToken: localStorage.getItem("refreshToken"),
			});

			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("refreshToken", data.refreshToken);
			api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

			processQueue(null, data.accessToken);
			original.headers.Authorization = `Bearer ${data.accessToken}`;
			return api(original);
		} catch (err) {
			processQueue(err, null);
			localStorage.clear();
			window.location.href = "/auth";
			return Promise.reject(err);
		} finally {
			isRefreshing = false;
		}
	},
);
