import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/'

export const arcadeApi = createApi({
    reducerPath: 'arcadeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Sections', 'Topics', 'Challenges'],
    endpoints: builder => ({
        getSections: builder.query({
            query: () => 'sections',
            providesTags: ['Sections'],
        }),
        getTopicsById: builder.query({
            query: (sectionName) => `topics/${sectionName}`,
            providesTags: ['Topics']
        }),
        getChallengesById: builder.query({
            query: (id) => `challenges/${id}`,
            providesTags: ['Challenges']
        }),
        runTest: builder.mutation({
            query: ({ code, tests }) => ({
                url: `challenges/code`,
                method: 'POST',
                body: { code, tests }
            }),
            invalidatesTags: ['Challenges'],
        }),
    })
})

export const {
    useGetSectionsQuery, useGetTopicsByIdQuery, useGetChallengesByIdQuery, useRunTestMutation
} = arcadeApi
