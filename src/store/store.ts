import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import preferencesReducer from './slices/preferencesSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        preferences: preferencesReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;