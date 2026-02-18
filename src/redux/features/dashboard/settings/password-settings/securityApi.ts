import { baseApi } from "@/redux/api/baseApi";

const securityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/manage/user/profile/change-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useChangePasswordMutation } = securityApi;