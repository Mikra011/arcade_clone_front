import { configureStore } from '@reduxjs/toolkit';
import { arcadeApi } from './arcadeApi';

export const store = configureStore({
    reducer: {
        [arcadeApi.reducerPath]: arcadeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(arcadeApi.middleware),
})


