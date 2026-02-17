import { baseApi } from "@/redux/api/baseApi";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => "/manage/user/profile",
        }),
    }),
});

export const { useGetProfileQuery } = profileApi;