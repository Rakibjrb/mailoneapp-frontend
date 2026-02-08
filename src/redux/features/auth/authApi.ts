import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data
            })
        }),

        register: builder.mutation({
            query: (data) => ({
                url: "/app-registration/register/user",
                method: "POST",
                body: data
            })
        }),

        requestOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password/get-otp",
                method: "POST",
                body: data
            })
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password/verify-otp",
                method: "POST",
                body: data
            })
        }),

        confirmResetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot-password/reset-password-confirm",
                method: "POST",
                body: data
            })
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: "/auth/logout",
                method: "POST",
                body: data
            })
        })

    })
});

export const { useLoginMutation, useRegisterMutation, useRequestOtpMutation, useVerifyOtpMutation, useConfirmResetPasswordMutation, useLogoutMutation } = authApi;