import { baseApi } from "@/redux/api/baseApi";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => "/manage/user/profile",
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/manage/user/profile",
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;