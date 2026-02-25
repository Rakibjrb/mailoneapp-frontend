import { baseApi } from "@/redux/api/baseApi";

const configApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getConfigs: builder.query({
            query: ({ }) => ({
                url: "/manage/smtp/configs",
                method: "GET",
            }),
            providesTags: ["Configs"],
        }),

        testConfig: builder.mutation({
            query: ({ }) => ({
                url: "/manage/smtp/config/nodemailer/test-config",
                method: "GET",
            }),
            invalidatesTags: ["Configs"],
        }),

        createConfig: builder.mutation({
            query: (data) => ({
                url: "/manage/smtp/config/nodemailer",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Configs"],
        }),

        updateConfig: builder.mutation({
            query: (data) => ({
                url: `/manage/smtp/config/nodemailer/${data.configId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Configs"],
        }),
    }),
});

export const { useGetConfigsQuery, useCreateConfigMutation, useUpdateConfigMutation, useTestConfigMutation } = configApi;