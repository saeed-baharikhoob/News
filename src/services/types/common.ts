export interface Article {
    id: string;
    title: string;
    description: string | null;
    content: string | null;
    author: string | null;
    publishedAt: string;
    url: string;
    imageUrl: string | null;
    source: string;
    category: string | null;
}


export interface SearchParams {
    query?: string;
    category?: string;
    source?: string;
    fromDate?: string | null;
    toDate?: string | null;
    page?: number;
    pageSize?: number;
}


export interface ApiResponse {
    articles: Article[];
    totalResults: number;
    currentPage: number;
    totalPages: number;
}


export interface ApiError {
    message: string;
    code: string;
    status: number;
}


