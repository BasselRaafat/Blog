import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "../../types/auth";
type UserState = {
	id: string;
	name: string;
	email: string;
	profilePic: string;
} | null;

const currentUserJson = localStorage.getItem("currentUser");
const initialState: UserState = currentUserJson
	? (JSON.parse(currentUserJson) as UserState)
	: null;
const userSlice = createSlice({
	name: "slice",
	initialState,
	reducers: {
		logIn: (_state, action: PayloadAction<LoginResponse>) => {
			const { accessToken, refreshToken, ...user } = action.payload;

			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("currentUser", JSON.stringify(user));
			return user;
		},
		logOut: () => {
			localStorage.removeItem("currentUser");
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			return null;
		},
	},
});

export default userSlice.reducer;
export const { logIn, logOut } = userSlice.actions;
