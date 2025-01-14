
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNews } from '../../store/slices/newsSlice';
import {
    setDateRange,
    setSource,
    resetFilters
} from '../../store/slices/filtersSlice';

export const useNewsFilters = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.filters);

    const getDataWithFilter = useCallback(() => {
        dispatch(fetchNews({ ...filters }));
    }, [dispatch, filters]);

    const handleDateFilter = useCallback((fromDate: string | null, toDate: string | null) => {
        dispatch(setDateRange({ from: fromDate, to: toDate }));
        dispatch(fetchNews({ ...filters, fromDate, toDate }));
    }, [dispatch, filters]);

    const handleSourceFilter = useCallback((source: string) => {
        dispatch(setSource(source));
        dispatch(fetchNews({ ...filters, source }));
    }, [dispatch, filters]);

    const resetAllFilters = useCallback(() => {
        dispatch(resetFilters());
    }, [dispatch]);

    return {
        filters,
        getDataWithFilter,
        handleDateFilter,
        handleSourceFilter,
        resetAllFilters
    };
};
