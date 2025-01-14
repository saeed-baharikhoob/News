import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {SearchParams} from "../../services/types";


interface FilterState extends SearchParams {
    searchTerm: string;
    selectedDate: {
        from: string | null;
        to: string | null;
    };
}

const initialState: FilterState = {
    searchTerm: '',
    query: '',
    category: '',
    source: '',
    fromDate: null,
    toDate: null,
    page: 1,
    pageSize: 20,
    selectedDate: {
        from: null,
        to: null,
    },
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
            state.query = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setSource: (state, action: PayloadAction<string>) => {
            state.source = action.payload;
        },
        setDateRange: (state, action: PayloadAction<{ from: string | null; to: string | null }>) => {
            state.selectedDate = action.payload;
            state.fromDate = action.payload.from;
            state.toDate = action.payload.to;
        },
        resetFilters: () => {
            return initialState;
        },
    },
});

export const {
    setSearchTerm,
    setCategory,
    setSource,
    setDateRange,
    resetFilters,

} = filtersSlice.actions;

export default filtersSlice.reducer;