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
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;