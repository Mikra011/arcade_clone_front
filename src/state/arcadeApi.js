import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const arcadeApi = createApi({
    reducerPath: 'arcadeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Sections', 'Topics', 'Challenges'],
    endpoints: builder => ({
        getSections: builder.query({
            query: () => 'sections',
            providesTags: ['Sections'],
        }),
        getTopicsById: builder.query({
            query: (id) => `topics/${id}`,
            providesTags: ['Topic']
        }),
        getChallengesById: builder.query({
            query: (id) => `challenges/${id}`,
            providesTags: ['Challenge']
        }),
        // for other then get I must use mutation!!!!
    })
})

export const {
    useGetSectionsQuery, useGetTopicsByIdQuery, useGetChallengesByIdQuery
} = arcadeApi
