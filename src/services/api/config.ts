import axios from 'axios';

export const API_CONFIG = {
    NEWS_API: {
        BASE_URL: 'https://newsapi.org/v2',
        API_KEY: process.env.REACT_APP_NEWS_API_KEY,
    },
    GUARDIAN: {
        BASE_URL: 'https://content.guardianapis.com',
        API_KEY: process.env.REACT_APP_GUARDIAN_API_KEY,
    },
    NYT: {
        BASE_URL: 'https://api.nytimes.com/svc/search/v2',
        API_KEY: process.env.REACT_APP_NYT_API_KEY,
    },
} as const;

export const DEFAULT_PARAMS = {
    pageSize: 20,
    page: 1,
} as const;

export const CATEGORIES = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
] as const;

