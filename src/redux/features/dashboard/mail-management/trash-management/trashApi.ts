import { baseApi } from "@/redux/api/baseApi";

const trashApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTrashedMail: builder.query({
            query: ({ page = 1, limit = 10 }: { page: number, limit: number }) => {
                let params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (limit) params.append("limit", limit.toString());

                return {
                    url: `/management/mail/trash?${params.toString()}`,
                    method: "GET"
                }
            },
            providesTags: ["Mail"]
        }),

        restoreMail: builder.mutation({
            query: ({ id }: { id: string }) => {
                return {
                    url: `/management/mail/restore/${id}`,
                    method: "PATCH",
                }
            },
            invalidatesTags: ["Mail"]
        }),

        emptyTrash: builder.mutation({
            query: () => {
                return {
                    url: `/management/mail/trash/empty-trash`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Mail"]
        })
    })
});

export const { useGetTrashedMailQuery, useRestoreMailMutation, useEmptyTrashMutation } = trashApi;