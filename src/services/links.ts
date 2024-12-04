// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILinksPayload, IDetailsPayload, IDetailsResponse } from '../models/links'

// Define a service using a base URL and expected endpoints
export const linksApi = createApi({
  reducerPath: 'links_api',
  baseQuery: fetchBaseQuery({ baseUrl: '/link/' }),
  endpoints: (builder) => ({
    getShortLink: builder.mutation({
        query: (payload: ILinksPayload) => ({
          url: `/shorten`,
          method: 'POST',
          body: payload,
        }),
      }),
    getLinkDetails: builder.query<IDetailsResponse[], IDetailsPayload>({
        query: (payload: IDetailsPayload) => ({
          url: `/details/${payload.link_id}`,
          method: 'GET',
          // body: payload
        }),
        transformResponse: (response: {data: IDetailsResponse[]}) => response.data,
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShortLinkMutation, useGetLinkDetailsQuery } = linksApi