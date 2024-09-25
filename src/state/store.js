import { configureStore } from '@reduxjs/toolkit'
import { arcadeApi } from './arcadeApi'
import challengeReducer from './arcadeSlice'

export const store = configureStore({
    reducer: {
        [arcadeApi.reducerPath]: arcadeApi.reducer,
        challenge: challengeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(arcadeApi.middleware),
})


