import { apiService } from "../apiService.service";

const contactEndpoints = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: () => "/contact",
    }),

    getContact: builder.query({
      query: (id) => ({
        url: `contact/${id}`,
        method: "GET",
      }),
    }),
    createContact: builder.mutation({
      query: (arg) => ({
        url: "/contact",
        method: "POST",
        body: arg,
      }),
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
    }),

    editContact: builder.mutation({
      query: (arg) => ({
        url: `/contact/${arg.id}`,
        method: "PUT",
        body: arg.values,
      }),
    }),
  }),
});

export const {
  useCreateContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
  useGetAllContactQuery,
  useGetContactQuery,
} = contactEndpoints;
