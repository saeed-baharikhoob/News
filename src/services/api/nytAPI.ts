import axios from 'axios';
import {ApiError, ApiResponse, Article, NYTArticle, NYTParams, NYTResponse, SearchParams} from '../types';
import {API_CONFIG, DEFAULT_PARAMS} from './config';

const nytApiInstance = axios.create({
    baseURL: API_CONFIG.NYT.BASE_URL,
    params: {
        'api-key': API_CONFIG.NYT.API_KEY
    }
});

const transformNYTArticle = (article: NYTArticle): Article => {
    const multimedia = article.multimedia?.find(media =>
        media.type === 'image' || media.subtype === 'photo'
    );

    return {
        id: article._id,
        title: article.headline.main,
        description: article.abstract,
        content: article.lead_paragraph,
        author: article.byline?.original || null,
        publishedAt: article.pub_date,
        url: article.web_url,
        imageUrl: multimedia ? `https://www.nytimes.com/${multimedia.url}` : null,
        source: 'The New York Times',
        category: article.news_desk || article.section_name || null
    };
};

// Remove hyphens
const formatDate = (dateString: string | null | undefined): string | undefined => {
    if (!dateString) return undefined;

    return dateString.replace(/-/g, '');
};

export const searchNYT = async (params: SearchParams): Promise<ApiResponse> => {
    try {
        const nytParams: NYTParams = {
            q: params.query || '',
            page: params.page ? params.page - 1 : 0,
            begin_date: formatDate(params.fromDate),
            end_date: formatDate(params.toDate),
            sort: 'newest',
        };

        if (params.category) {
             const categories = params.category.split(',').map(cat => cat.trim());
             nytParams.fq = categories.map(cat => `news_desk:("${cat}")`).join(' OR ');
        }

        const { data } = await nytApiInstance.get<NYTResponse>('/articlesearch.json', {
            params: nytParams
        });

        if (!data.response) {
            throw new Error('Invalid response from NYT API');
        }

        const articles = data.response.docs.map(transformNYTArticle);
        const totalResults = data.response.meta.hits;
        const pageSize = params.pageSize || DEFAULT_PARAMS.pageSize;

        return {
            articles,
            totalResults,
            currentPage: (params.page || DEFAULT_PARAMS.page),
            totalPages: Math.ceil(totalResults / pageSize)
        };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.fault?.faultstring || 'Failed to fetch from NYT API',
            code: error.response?.data?.fault?.detail?.errorcode || 'NYT_API_ERROR',
            status: error.response?.status || 500
        };
        throw apiError;
    }
};


export const getNYTTopStories = async (section: string = 'home'): Promise<ApiResponse> => {
    try {
        const { data } = await axios.get(
            `https://api.nytimes.com/svc/topstories/v2/${section}.json`,
            {
                params: {
                    'api-key': API_CONFIG.NYT.API_KEY
                }
            }
        );

        if (!data.results) {
            throw new Error('Invalid response from NYT Top Stories API');
        }

        const articles = data.results.map((article: any): Article => ({
            id: article.uri,
            title: article.title,
            description: article.abstract,
            content: article.abstract,
            author: article.byline || null,
            publishedAt: article.published_date,
            url: article.url,
            imageUrl: article.multimedia?.[0]?.url || null,
            source: 'The New York Times',
            category: article.section || null
        }));

        return {
            articles,
            totalResults: articles.length,
            currentPage: 1,
            totalPages: 1
        };
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.fault?.faultstring || 'Failed to fetch NYT top stories',
            code: error.response?.data?.fault?.detail?.errorcode || 'NYT_TOP_STORIES_ERROR',
            status: error.response?.status || 500
        };
        throw apiError;
    }
};
