import { baseApi } from "@/redux/api/baseApi";

const templatesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTemplates: builder.query({
            query: ({ page = 1, limit = 10, search = "" }: { page: number, limit: number, search: string }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (limit) params.append("limit", limit.toString());
                if (search) params.append("search", search);

                return {
                    url: `/manage/template/get?${params.toString()}`,
                    method: "GET"
                }
            },

            providesTags: ["Templates"]
        }),

        createTemplate: builder.mutation({
            query: (data) => ({
                url: "/manage/template/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Templates"]
        })
    })
})

export const { useGetTemplatesQuery, useCreateTemplateMutation } = templatesApi;