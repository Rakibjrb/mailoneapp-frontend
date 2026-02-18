{/* eslint-disable @typescript-eslint/no-explicit-any */ }
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import Cookies from "js-cookie";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:8001/api";

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers: Headers, { getState }) => {
        const token = (getState() as RootState).auth.token || Cookies.get("accessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithRefreshToken: BaseQueryFn<
    string | FetchArgs,
    unknown,
    unknown
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 404 && typeof args !== 'string' && args.url?.includes("user")) {
        console.log("User not found");
    }

    if (result?.error?.status === 401 && Cookies.get("refreshToken")) {
        try {
            const refreshResult: any = await axios.post(baseUrl + '/auth/refresh-token',
                {
                    refreshToken: Cookies.get("refreshToken") || null,
                }
            );

            const user = (api.getState() as RootState).auth.user;
            const newAccessToken = refreshResult.data.data.access_token;
            const newRefreshToken = refreshResult.data.data.refresh_token;

            Cookies.set("accessToken", newAccessToken, {
                secure: true,
                sameSite: "strict",
                path: "/",
                expires: 30,
            });

            Cookies.set("refreshToken", newRefreshToken, {
                secure: true,
                sameSite: "strict",
                path: "/",
                expires: 30,
            });

            api.dispatch(
                setUser({
                    user,
                    token: newAccessToken,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } catch {
            console.log("Logout trigered!");
            api.dispatch(logout());
            window.location.replace("/login");
        }
    }

    return result;
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ["Mail"],
    endpoints: () => ({})
});