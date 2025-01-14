import { Article, SearchParams, ApiResponse, ApiError } from '../../types';
import { searchNewsAPI, getTopHeadlines } from '../newsAPI';
import { searchGuardian, getLatestGuardianArticles } from '../guardianAPI';
import { searchNYT, getNYTTopStories } from '../nytAPI';
import { processArticles, filterArticlesByPreferences } from '../../../utils/utils';

const createApiResponse = (articles: Article[]): ApiResponse => ({
    articles,
    totalResults: articles.length,
    currentPage: 1,
    totalPages: 1
});

const createApiError = (message: string, code: string): ApiError => ({
    message,
    code,
    status: 500
});

const combineApiResults = (results: PromiseSettledResult<ApiResponse>[]): Article[] =>
    results.reduce<Article[]>((acc, result) => {
        if (result.status === 'fulfilled') {
            return [...acc, ...result.value.articles];
        }
        return acc;
    }, []);

export const searchAllSources = async (params: SearchParams): Promise<ApiResponse> => {
    try {
        const enhancedParams = {
            ...params,
            pageSize: 20
        };

        const results = await Promise.allSettled([
            searchNewsAPI(enhancedParams),
            searchGuardian(enhancedParams),
            searchNYT(enhancedParams),
        ]);

        const allArticles = combineApiResults(results);
        const processedArticles = processArticles(allArticles);

        return createApiResponse(processedArticles);
    } catch (error) {
        throw createApiError('Error fetching news from multiple sources', 'AGGREGATOR_ERROR');
    }
};

export const getAllTopStories = async (params: SearchParams): Promise<ApiResponse> => {
    try {
        const enhancedParams = {
            ...params,
            pageSize: 100
        };

        const results = await Promise.allSettled([
            getTopHeadlines(enhancedParams),
            getLatestGuardianArticles(enhancedParams),
            getNYTTopStories(params.category || 'home')
        ]);

        const allArticles = combineApiResults(results);
        const processedArticles = processArticles(allArticles);

        return createApiResponse(processedArticles);
    } catch (error) {
        throw createApiError('Error fetching top stories from multiple sources', 'AGGREGATOR_ERROR');
    }
};

export const getCustomNewsFeed = async (
    preferences: {
        selectedSources: string[];
        selectedCategories: string[];
        selectedAuthors: string[];
    },
    params: SearchParams
): Promise<ApiResponse> => {
    try {
        const allArticlesResponse = await searchAllSources(params);

        const hasPreferences = preferences.selectedSources.length > 0 ||
            preferences.selectedCategories.length > 0 ||
            preferences.selectedAuthors.length > 0;

        const filteredArticles = hasPreferences
            ? filterArticlesByPreferences(allArticlesResponse.articles, preferences)
            : allArticlesResponse.articles;

        return createApiResponse(filteredArticles);
    } catch (error) {
        throw createApiError('Error fetching custom news feed', 'CUSTOM_FEED_ERROR');
    }
};