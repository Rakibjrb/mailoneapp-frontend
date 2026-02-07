{/* eslint-disable @typescript-eslint/no-explicit-any */ }
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API || "http://localhost:8001/api",
    credentials: "include",
    prepareHeaders: (headers: Headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
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
            },
            api,
            extraOptions
        );

        if (refreshResult?.data?.success) {
            const user = (api.getState() as RootState).auth.user;
            const newAccessToken = refreshResult.data.data.accessToken;

            api.dispatch(
                setUser({
                    user,
                    token: newAccessToken,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: [],
    endpoints: () => ({})
});