import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomNewsFeed } from '../../services/api/aggregator';
import { Article, SearchParams } from '../../services/types';

interface PreferencesState {
    selectedSources: string[];
    selectedCategories: string[];
    selectedAuthors: string[];
    customFeed: Article[];
    loading: boolean;
    error: string | null;
}

const initialState: PreferencesState = {
    selectedSources: [],
    selectedCategories: [],
    selectedAuthors: [],
    customFeed: [],
    loading: false,
    error: null,
};

export const fetchCustomFeed = createAsyncThunk(
    'preferences/fetchCustomFeed',
    async ({ preferences, params }: {
        preferences: {
            selectedSources: string[];
            selectedCategories: string[];
            selectedAuthors: string[];
        };
        params: SearchParams
    }) => {
        const response = await getCustomNewsFeed(preferences, params);
        return response;
    }
);

const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        updateSources: (state, action) => {
            state.selectedSources = action.payload;
        },
        updateCategories: (state, action) => {
            state.selectedCategories = action.payload;
        },
        updateAuthors: (state, action) => {
            state.selectedAuthors = action.payload;
        },
        clearPreferences: (state) => {
            state.selectedSources = [];
            state.selectedCategories = [];
            state.selectedAuthors = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomFeed.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.customFeed = action.payload.articles;
            })
            .addCase(fetchCustomFeed.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch custom feed';
            });
    },
});

export const {
    updateSources,
    updateCategories,
    updateAuthors,
    clearPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;