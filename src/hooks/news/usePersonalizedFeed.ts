import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    fetchGuardianNews,
    fetchNYTNews,
    fetchNewsAPI,
    setArticles
} from '../../store/slices/newsSlice';
import {Article} from "../../services/types";

export const usePersonalizedFeed = () => {
    const dispatch = useAppDispatch();
    const preferences = useAppSelector((state) => state.preferences);
    const loading = useAppSelector((state) => state.news.loading);

    const getPersonalizedFeed = useCallback(async () => {
        if(loading) return;

        try {
            const currentParams = {

                category: preferences.selectedCategories.length > 0
                    ? preferences.selectedCategories.join(',')
                    : undefined
            };

            const apiCalls = preferences.selectedSources.map(source => {
                switch (source) {
                    case 'The Guardian':
                        return dispatch(fetchGuardianNews(currentParams)).unwrap();
                    case 'The New York Times':
                        return dispatch(fetchNYTNews(currentParams)).unwrap();
                    case 'NewsAPI':
                        return dispatch(fetchNewsAPI(currentParams)).unwrap();
                    default:
                        return null;
                }
            }).filter(Boolean);

            const results = await Promise.allSettled(apiCalls);
            let allArticles: Article[]   = [];

            results.forEach(result => {
                if (result.status === 'fulfilled' && result.value) {
                    allArticles = [...allArticles, ...result.value.articles];
                }
            });

            allArticles = allArticles
                .filter((article, index, self) =>
                    index === self.findIndex(a => a.url === article.url)
                )
                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

            dispatch(setArticles({
                articles: allArticles,
                totalResults: allArticles.length,
                currentPage: 1,
                totalPages: 1
            }));
        } catch (error) {
            console.error('Error fetching personalized feed:', error);
        }
    }, [dispatch, preferences, loading]);

    return {
        getPersonalizedFeed
    };
};