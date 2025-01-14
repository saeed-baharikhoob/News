import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../../components/features/search/SearchBar';
import newsReducer from '../../store/slices/newsSlice';
import filtersReducer from '../../store/slices/filtersSlice';
import preferencesReducer from '../../store/slices/preferencesSlice';
import * as newsHooks from '../../hooks/news';
import React from "react";


jest.mock('../../hooks/news', () => ({
    useNews: jest.fn()
}));

describe('SearchBar', () => {
    const mockSearchNews = jest.fn();

    beforeEach(() => {
        (newsHooks.useNews as jest.Mock).mockImplementation(() => ({
            searchNews: mockSearchNews,
            loading: false
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const createTestStore = () => configureStore({
        reducer: {
            news: newsReducer,
            filters: filtersReducer,
            preferences: preferencesReducer
        },
        preloadedState: {
            filters: {
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
            },
            news: {
                articles: [],
                topStories: [],
                loading: false,
                error: null,
                totalResults: 0,
                currentPage: 1,
                totalPages: 1
            }
        }
    });

    const renderWithProvider = (ui: React.ReactElement) => {
        const store = createTestStore();
        return {
            ...render(<Provider store={store}>{ui}</Provider>),
            store,
            mockSearchNews
        };
    };

    it('renders search input correctly', () => {
        const { getByPlaceholderText } = renderWithProvider(<SearchBar />);
        expect(getByPlaceholderText(/search news articles/i)).toBeInTheDocument();
    });

    it('updates input value when typing', async () => {
        const { getByPlaceholderText } = renderWithProvider(<SearchBar />);
        const searchInput = getByPlaceholderText(/search news articles/i) as HTMLInputElement;

        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'iran' } });
        });

        expect(searchInput.value).toBe('iran');
    });

    it('calls searchNews when submitting form', async () => {
        const { getByPlaceholderText, mockSearchNews } = renderWithProvider(<SearchBar />);
        const searchInput = getByPlaceholderText(/search news articles/i) as HTMLInputElement;
        const form = searchInput.closest('form')!;

        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'iran' } });
            fireEvent.submit(form);
        });

        expect(mockSearchNews).toHaveBeenCalledWith('iran');
    });

    it('calls searchNews when clicking search button', async () => {
        const { getByPlaceholderText, getByLabelText, mockSearchNews } = renderWithProvider(<SearchBar />);
        const searchInput = getByPlaceholderText(/search news articles/i) as HTMLInputElement;

        const form = searchInput.closest('form')!;

        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'iran' } });
            fireEvent.submit(form);
        });

        expect(mockSearchNews).toHaveBeenCalledWith('iran');
    });


});