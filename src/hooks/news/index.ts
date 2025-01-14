import { useNewsSearch } from './useNewsSearch';
import { useNewsFilters } from './useNewsFilters';
import { useNewsPreferences } from './useNewsPreferences';
import { usePersonalizedFeed } from './usePersonalizedFeed';
import { useAppSelector } from '../../store/hooks';

export const useNews = () => {
    const {
        articles,
        topStories,
        loading,
        error,
        totalResults,
        currentPage,
        totalPages
    } = useAppSelector((state) => state.news);

    const newsSearch = useNewsSearch();
    const newsFilters = useNewsFilters();
    const newsPreferences = useNewsPreferences();
    const personalizedFeed = usePersonalizedFeed();

    return {
        // States
        articles,
        topStories,
        loading,
        error,
        filters: newsFilters.filters,
        preferences: newsPreferences.preferences,
        pagination: {
            currentPage,
            totalPages,
            totalResults
        },

        // Search and Filter Actions
        fetchNews: newsSearch.fetchNews,
        searchNews: newsSearch.searchNews,
        getNewsByCategory: newsSearch.getNewsByCategory,
        getTopStories: newsSearch.getTopStories,
        getPersonalizedFeed: personalizedFeed.getPersonalizedFeed,

        // Filter Actions
        getDataWithFilter: newsFilters.getDataWithFilter,
        handleDateFilter: newsFilters.handleDateFilter,
        handleSourceFilter: newsFilters.handleSourceFilter,

        // Preference Management
        updatePreferences: newsPreferences.updatePreferences,

        // Reset Actions
        resetFilters: newsFilters.resetAllFilters,
        resetPreferences: newsPreferences.resetPreferences,
    };
};