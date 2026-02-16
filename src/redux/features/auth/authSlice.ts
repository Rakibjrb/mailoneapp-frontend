import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export type TUser = {
    id: string;
    email: string;
    name: string;
    image: string;
}

export type TAuthState = {
    user: null | TUser;
    token: null | string;
}

const initialState: TAuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            if (user !== undefined) state.user = user;
            if (token) {
                state.token = token;
            } else if (typeof window !== "undefined") {
                state.token = Cookies.get("accessToken") || null;
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;