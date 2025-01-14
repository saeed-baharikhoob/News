import axios from 'axios';
import {
    SearchParams,
    ApiResponse,
    Article,
    ApiError,
    GuardianArticle,
    GuardianAPIResponse,
    GuardianParams
} from '../types';
import { API_CONFIG, DEFAULT_PARAMS } from './config';

const guardianApiInstance = axios.create({
    baseURL: API_CONFIG.GUARDIAN.BASE_URL,
    params: {
        'api-key': API_CONFIG.GUARDIAN.API_KEY
    }
});


const FIELDS = [
    'headline',
    'trailText',
    'thumbnail',
    'bodyText',
    'lastModified',
    'byline',
    'publication',
    'shortUrl'
].join(',');


const transformGuardianArticle = (article: GuardianArticle): Article => ({
    id: article.id,
    title: article.webTitle,
    description: article.fields?.trailText || null,
    content: article.fields?.bodyText || null,
    author: article.fields?.byline || null,
    publishedAt: article.webPublicationDate,
    url: article.webUrl,
    imageUrl: article.fields?.thumbnail || null,
    source: 'The Guardian',
    category: article.sectionName || null
});

export const searchGuardian = async (params: SearchParams): Promise<ApiResponse> => {
    try {
        const guardianParams: GuardianParams = {
            q: params.query || '',
            'page-size': params.pageSize || DEFAULT_PARAMS.pageSize,
            page: params.page || DEFAULT_PARAMS.page,
            'from-date': params.fromDate || undefined,
            'to-date': params.toDate || undefined,
            'order-by': 'newest',
            'show-fields': FIELDS
        };
        if (params.category) {
            guardianParams.section = params.category.replaceAll(',','|');
        }
        const { data } = await guardianApiInstance.get<GuardianAPIResponse>('/search', {
            params: guardianParams
        });

        const { results, total, currentPage, pages } = data.response;

        return {
            articles: results.map(transformGuardianArticle),
            totalResults: total,
            currentPage: currentPage,
            totalPages: pages
        };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || 'Failed to fetch from Guardian API',
            code: error.response?.data?.code || 'GUARDIAN_API_ERROR',
            status: error.response?.status || 500
        };
        throw apiError;
    }
};
export const getLatestGuardianArticles = async (params: SearchParams): Promise<ApiResponse> => {
    try {
        const guardianParams: GuardianParams = {
            'page-size': params.pageSize || DEFAULT_PARAMS.pageSize,
            page: params.page || DEFAULT_PARAMS.page,
            'order-by': 'newest',
            'show-fields': FIELDS,
        };
        if (params.category) {
            guardianParams.section = params.category;
        }
        const { data } = await guardianApiInstance.get<GuardianAPIResponse>('/search', {
            params: guardianParams
        });

        const { results, total, currentPage, pages } = data.response;

        return {
            articles: results.map(transformGuardianArticle),
            totalResults: total,
            currentPage: currentPage,
            totalPages: pages
        };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || 'Failed to fetch latest Guardian articles',
            code: error.response?.data?.code || 'GUARDIAN_LATEST_ERROR',
            status: error.response?.status || 500
        };
        throw apiError;
    }
};
