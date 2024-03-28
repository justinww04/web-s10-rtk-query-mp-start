import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const quotesApi = createApi({
    reducerPath: 'quoteApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9009/api/'}),
    tagTypes: ['quotes'],
    endpoints: build => ({
        getQuotes: build.query({
            query: () => 'quotes',
            providesTags: ['quotes'] 
        }),
        addQuote: build.mutation({
            query: (todo) => ({
                url: 'quotes',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['quotes']
        }),
        removeQuote: build.mutation({
            query: (id) => ({
                url: `quotes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['quotes']
        }),
        updateQuote: build.mutation({
            query: ({id, boolean}) => ({
                url: `quotes/${id}`,
                method: 'PUT',
                body: {apocryphal: boolean}
            }),
            invalidatesTags: ['quotes']
        })
    })
})
export const {useGetQuotesQuery, useAddQuoteMutation, useRemoveQuoteMutation, useUpdateQuoteMutation} = quotesApi