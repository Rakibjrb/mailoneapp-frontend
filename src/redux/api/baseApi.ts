{/* eslint-disable @typescript-eslint/no-explicit-any */ }
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API || "http://localhost:8001/api",
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

    if (result?.error?.status === 401) {
        const refreshResult: any = await baseQuery(
            {
                url: '/auth/refresh-token',
                method: 'POST',
                body: {
                    refreshToken: Cookies.get("refreshToken") || null,
                }
            },
            api,
            extraOptions
        );

        console.log(refreshResult);

        if (refreshResult?.data?.success) {
            const user = (api.getState() as RootState).auth.user;
            const newAccessToken = refreshResult.data.data.access_token;
            const newRefreshToken = refreshResult.data.data.refresh_token;

            Cookies.set("accessToken", newAccessToken, {
                expires: 60 / (24 * 60),
                secure: true,
                sameSite: "strict",
                path: "/"
            });

            Cookies.set("refreshToken", newRefreshToken, {
                expires: 60 / (24 * 60),
                secure: true,
                sameSite: "strict",
                path: "/"
            });

            api.dispatch(
                setUser({
                    user,
                    token: newAccessToken,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            // api.dispatch(logout());
            console.log("Logout trigered!")
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