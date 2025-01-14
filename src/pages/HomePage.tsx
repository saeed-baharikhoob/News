import React, {useCallback, useEffect} from 'react';
import { Container } from '@mui/material';
import SearchContainer from '../components/features/search/SearchContainer';
import NewsFeed from '../components/features/news-feed/NewsFeed';

import {useNews} from "../hooks/news";
import {useAppSelector} from "../store/hooks";

const HomePage = () => {
    const filters = useAppSelector((state) => state.filters);
    const {
        loading,
        getTopStories,
        searchNews,
    } = useNews();
    const hasActiveFilters = useCallback(() =>
            Object.entries(filters)
                .some(([key, value]) =>
                    ['searchTerm', 'category', 'source', 'fromDate', 'toDate']
                        .includes(key) && Boolean(value)
                ),
        [filters]
    );

    useEffect(() => {
        if (!loading) {
            hasActiveFilters() ? searchNews(filters.query || '') : getTopStories();
        }
    }, []);
    return (
        <Container maxWidth="lg">
            <SearchContainer />
            <NewsFeed />
        </Container>
    );
};

export default HomePage;