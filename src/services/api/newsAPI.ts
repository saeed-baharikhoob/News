import axios from 'axios';
import {
    SearchParams,
    ApiResponse,
    Article,
    ApiError,
    NewsAPIArticle,
    NewsAPIResponse,
    NewsAPIParams
} from '../types';
import { API_CONFIG, DEFAULT_PARAMS } from './config';

const newsApiInstance = axios.create({
    baseURL: API_CONFIG.NEWS_API.BASE_URL,
    headers: {
        'X-Api-Key': API_CONFIG.NEWS_API.API_KEY || ''
    }
});


const transformNewsAPIArticle = (article: NewsAPIArticle): Article => ({
    id: article.url,
    title: article.title,
    description: article.description,
    content: article.content,
    author: article.author,
    publishedAt: article.publishedAt,
    url: article.url,
    imageUrl: article.urlToImage,
    source: article.source.name,
    category: null
});



export const searchNewsAPI = async (params: SearchParams): Promise<ApiResponse> => {
    try {


        const searchParams: NewsAPIParams = {
            q: params.query || 'latest news',
            searchIn: 'title,description,content',
            from: params.fromDate || '',
            to: params.toDate || '',
            language: 'en',
            sortBy: 'publishedAt',
            page: params.page || DEFAULT_PARAMS.page,
            pageSize: params.pageSize || DEFAULT_PARAMS.pageSize,
        };
        if(params.category)
        {
            let query = params.query;

            if(params.query )
                query =  query +' And '+  params.category.split(',').map((q) => q.trim()).join(' OR ');
            else
                query =   params.category.split(',').map((q) => q.trim()).join(' OR ');

            searchParams.q =query

        }


        const { data } = await newsApiInstance.get<NewsAPIResponse>('/everything', {
            params: searchParams,
        });

        if (data.status !== 'ok') {
            throw new Error(data.message || 'Failed to fetch news');
        }

        return {
            articles: data.articles.map(transformNewsAPIArticle),
            totalResults: data.totalResults,
            currentPage: params.page || DEFAULT_PARAMS.page,
            totalPages: Math.ceil(data.totalResults / (params.pageSize || DEFAULT_PARAMS.pageSize)),
        };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'Failed to fetch from NewsAPI',
            code: error.response?.data?.code || 'NEWSAPI_ERROR',
            status: error.response?.status || 500,
        };
        throw apiError;
    }
};


export const getTopHeadlines = async (params: SearchParams): Promise<ApiResponse> => {
    try {
        const headlineParams: NewsAPIParams = {
            category: params?.category,
            q: params.query,
            language: 'en',
            page: params.page || DEFAULT_PARAMS.page,
            pageSize: params.pageSize || DEFAULT_PARAMS.pageSize
        };

        const { data } = await newsApiInstance.get<NewsAPIResponse>('/top-headlines', {
            params: headlineParams
        });

        if (data.status !== 'ok') {
            throw new Error(data.message || 'Failed to fetch top headlines');
        }

        return {
            articles: data.articles.map(transformNewsAPIArticle),
            totalResults: data.totalResults,
            currentPage: params.page || DEFAULT_PARAMS.page,
            totalPages: Math.ceil(data.totalResults / (params.pageSize || DEFAULT_PARAMS.pageSize))
        };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'Failed to fetch top headlines',
            code: error.response?.data?.code || 'NEWSAPI_HEADLINES_ERROR',
            status: error.response?.status || 500
        };
        throw apiError;
    }

};