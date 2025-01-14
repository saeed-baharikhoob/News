import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Article, SearchParams, ApiResponse } from '../../services/types';
import {
    searchAllSources,
    getAllTopStories,
} from '../../services/api/aggregator';
import { searchNYT } from "../../services/api/nytAPI";
import { getTopHeadlines, searchNewsAPI } from "../../services/api/newsAPI";
import { getLatestGuardianArticles } from "../../services/api/guardianAPI";

interface NewsState {
    articles: Article[];
    topStories: Article[];
    loading: boolean;
    error: string | null;
    totalResults: number;
    currentPage: number;
    totalPages: number;
}

const initialState: NewsState = {
    articles: [],
    topStories: [],
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
    totalPages: 1
};


export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (params: SearchParams) => await searchAllSources(params)
);

export const fetchTopStories = createAsyncThunk(
    'news/fetchTopStories',
    async (params: SearchParams) => await getAllTopStories(params)
);

export const fetchGuardianNews = createAsyncThunk(
    'news/fetchGuardianNews',
    async (params: SearchParams) => await getLatestGuardianArticles(params)
);

export const fetchNYTNews = createAsyncThunk(
    'news/fetchNYTNews',
    async (params: SearchParams) => await searchNYT(params)
);

export const fetchNewsAPI = createAsyncThunk(
    'news/fetchNewsAPI',
    async (params: SearchParams) => await searchNewsAPI(params)
);


const handleApiState = {
    pending: (state: NewsState) => {
        state.loading = true;
        state.error = null;
    },
    fulfilled: (state: NewsState, payload: ApiResponse) => {
        state.loading = false;
        state.articles = payload.articles;
        state.totalResults = payload.totalResults;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
        state.error = null;
    },
    rejected: (state: NewsState, error: string) => {
        state.loading = false;
        state.error = error;
    }
};


const addApiReducers = (
    builder: ActionReducerMapBuilder<NewsState>,
    thunk: any,
    errorMessage: string
) => {
    builder
        .addCase(thunk.pending, (state) => {
            handleApiState.pending(state);
        })
        .addCase(thunk.fulfilled, (state, action) => {
            handleApiState.fulfilled(state, action.payload);
        })
        .addCase(thunk.rejected, (state, action) => {
            handleApiState.rejected(state, action.error.message || errorMessage);
        });
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {

        setArticles: (state, action: PayloadAction<ApiResponse>) => {
            handleApiState.fulfilled(state, action.payload);
        },

    },
    extraReducers: (builder) => {

        const apiCalls = [
            { thunk: fetchNews, error: 'Failed to fetch news' },
            { thunk: fetchTopStories, error: 'Failed to fetch top stories' },
            { thunk: fetchGuardianNews, error: 'Failed to fetch Guardian news' },
            { thunk: fetchNYTNews, error: 'Failed to fetch NYT news' },
            { thunk: fetchNewsAPI, error: 'Failed to fetch NewsAPI news' }
        ];

        apiCalls.forEach(({ thunk, error }) => {
            addApiReducers(builder, thunk, error);
        });
    },
});

export const {  setArticles } = newsSlice.actions;
export default newsSlice.reducer;