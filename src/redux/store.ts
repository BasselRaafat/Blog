import { configureStore } from "@reduxjs/toolkit";
import userReducser from "./slices/userSlice";

const store = configureStore({
	reducer: {
		user: userReducser,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export default store;
