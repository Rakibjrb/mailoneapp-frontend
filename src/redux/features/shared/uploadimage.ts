import { baseApi } from "@/redux/api/baseApi";

export const uploadImageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: "/media/upload/image",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useUploadImageMutation } = uploadImageApi;