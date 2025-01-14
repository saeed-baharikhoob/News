

export interface GuardianFields {
    headline: string;
    trailText: string;
    bodyText: string;
    thumbnail: string;
    lastModified: string;
    byline: string;
    wordcount: string;
    isLive: string;
}

export interface GuardianArticle {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    fields?: GuardianFields;
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
}

export interface GuardianResponse {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: GuardianArticle[];
}

export interface GuardianAPIResponse {
    response: GuardianResponse;
}

export interface GuardianParams {
    q?: string;
    section?: string;
    'order-by'?: 'newest' | 'oldest' | 'relevance';
    'page-size'?: number;
    page?: number;
    'from-date'?: string;
    'to-date'?: string;
    'show-fields'?: string;
}

