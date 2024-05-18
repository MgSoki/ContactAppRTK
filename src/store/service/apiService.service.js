import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact.sankyitar.store/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  endpoints: (endpoints) => ({}),
});
