import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    updateSources,
    updateCategories,
    updateAuthors,
    clearPreferences
} from '../../store/slices/preferencesSlice';

export const useNewsPreferences = () => {
    const dispatch = useAppDispatch();
    const preferences = useAppSelector((state) => state.preferences);

    const updateSourcePreferences = useCallback((sources: string[]) => {
        dispatch(updateSources(sources));
    }, [dispatch]);

    const updateCategoryPreferences = useCallback((categories: string[]) => {
        dispatch(updateCategories(categories));
    }, [dispatch]);

    const updateAuthorPreferences = useCallback((authors: string[]) => {
        dispatch(updateAuthors(authors));
    }, [dispatch]);

    const resetAllPreferences = useCallback(() => {
        dispatch(clearPreferences());
    }, [dispatch]);


    const updatePreferences = {
        updateSourcePreferences,
        updateCategoryPreferences,
        updateAuthorPreferences
    };

    return {
        preferences,
        updatePreferences,
        resetPreferences: resetAllPreferences
    };
};