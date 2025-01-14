export interface NewsAPISource {
    id: string | null;
    name: string;
}

export interface NewsAPIArticle {
    source: NewsAPISource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: NewsAPIArticle[];
    message?: string;
    code?: string;
}


export interface NewsAPIParams {
    q?: string;
    searchIn?: 'title' | 'description' | 'content' | string;
    sources?: string;
    domains?: string;
    excludeDomains?: string;
    from?: string;
    to?: string;
    language?: string;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
    pageSize?: number;
    page?: number;
    country?: string;
    category?: string;
}
