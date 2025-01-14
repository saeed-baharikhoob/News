import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNews, fetchTopStories } from '../../store/slices/newsSlice';
import { setSearchTerm, setCategory } from '../../store/slices/filtersSlice';

export const useNewsSearch = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.filters);

    const searchNews = useCallback((searchTerm: string) => {
        dispatch(setSearchTerm(searchTerm));
        dispatch(fetchNews({ ...filters, query: searchTerm }));
    }, [dispatch, filters]);

    const getNewsByCategory = useCallback((category: string) => {
        dispatch(setCategory(category));
        dispatch(fetchNews({ ...filters, category }));
    }, [dispatch, filters]);

    const getTopStories = useCallback(() => {
        dispatch(fetchTopStories(filters));
    }, [dispatch, filters]);

    return {
        searchNews,
        getNewsByCategory,
        getTopStories,
        fetchNews
    };
};