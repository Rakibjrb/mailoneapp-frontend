import { baseApi } from "@/redux/api/baseApi";

const mailApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMail: builder.query({
            query: ({ page = 1, limit = 10, search = "", isSelected = "all", sortBy = "createdAt", sortOrder = "desc" }: { page: number, limit: number, search: string, isSelected: string, sortBy: string, sortOrder: string }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (limit) params.append("limit", limit.toString());
                if (search) params.append("search", search);
                if (isSelected) params.append("isSelected", isSelected);
                if (sortBy) params.append("sortBy", sortBy);
                if (sortOrder) params.append("sortOrder", sortOrder);

                return {
                    url: `/management/mail/all?${params.toString()}`,
                    method: "GET"
                }
            },
            providesTags: ["Mail"]
        }),

        updateMailSelection: builder.mutation({
            query: ({ id, isSelected }: { id: string, isSelected: string }) => {
                return {
                    url: `/management/mail/update/${id}?isSelected=${isSelected}`,
                    method: "PATCH",
                }
            },
            invalidatesTags: ["Mail"]
        }),

        updateMultipleMailStatus: builder.mutation({
            query: (data) => {
                return {
                    url: `/management/mail/update/many/mails`,
                    method: "PATCH",
                    body: data,
                }
            },
            invalidatesTags: ["Mail"]
        }),

        deleteMail: builder.mutation({
            query: (id: string) => {
                return {
                    url: `/management/mail/delete/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Mail"]
        }),

        deleteMultipleMail: builder.mutation({
            query: (mailIds: string[]) => {
                return {
                    url: `/management/mail/delete/many/mails`,
                    method: "DELETE",
                    body: { mailIds },
                }
            },
            invalidatesTags: ["Mail"]
        }),

        uploadSingleMail: builder.mutation({
            query: (data) => {
                return {
                    url: `/management/mail/create`,
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags: ["Mail"]
        }),

        uploadBulkMail: builder.mutation({
            query: (data) => {
                return {
                    url: `/management/mail/create/many`,
                    method: "POST",
                    body: data,
                }
            },
            invalidatesTags: ["Mail"]
        })
    })
});

export const { useGetAllMailQuery, useUpdateMailSelectionMutation, useUpdateMultipleMailStatusMutation, useDeleteMailMutation, useDeleteMultipleMailMutation, useUploadSingleMailMutation, useUploadBulkMailMutation } = mailApi;