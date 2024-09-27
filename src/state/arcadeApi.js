import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/';

// A helper to prepare the headers for authenticated requests
const prepareHeaders = (headers) => {
    const token = localStorage.getItem('token');  // Get the token from localStorage
    if (token) {
        headers.set('Authorization', `${token}`);  // Add the token to the Authorization header
    }
    return headers;
};

export const arcadeApi = createApi({
    reducerPath: 'arcadeApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders,  // Automatically include the Authorization header
    }),
    tagTypes: ['Sections', 'Topics', 'Challenges', 'Progress'],
    endpoints: (builder) => ({
        // function routes
        getSections: builder.query({
            query: () => 'sections',
            providesTags: ['Sections'],
        }),
        getTopicsById: builder.query({
            query: (sectionName) => `topics/${sectionName}`,
            providesTags: ['Topics'],
        }),
        getChallengesById: builder.query({
            query: (id) => `challenges/${id}`,
            providesTags: ['Challenges'],
        }),
        runTest: builder.mutation({
            query: ({ code, tests }) => ({
                url: 'challenges/code',
                method: 'POST',
                body: { code, tests },
            }),
            invalidatesTags: ['Challenges'],
        }),

        // Auth routes
        registerUser: builder.mutation({
            query: (userData) => ({
                url: 'auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // progression routes
        recordProgress: builder.mutation({
            query: ({ challenge_id, completed }) => ({
                url: 'progress/record',
                method: 'POST',
                body: { challenge_id, completed },
            }),
        }),

    }),
});

export const {
    useGetSectionsQuery,
    useGetTopicsByIdQuery,
    useGetChallengesByIdQuery,
    useRunTestMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
    useRecordProgressMutation
} = arcadeApi;
