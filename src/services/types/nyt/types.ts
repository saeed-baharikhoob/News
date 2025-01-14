
export interface NYTMultimedia {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
}

export interface NYTHeadline {
    main: string;
    kicker: string | null;
    content_kicker: string | null;
    print_headline: string | null;
    name: string | null;
    seo: string | null;
    sub: string | null;
}

export interface NYTByline {
    original: string | null;
    person: Array<{
        firstname: string;
        middlename: string | null;
        lastname: string;
        qualifier: string | null;
        title: string | null;
        role: string;
        organization: string;
    }>;
    organization: string | null;
}

export interface NYTArticle {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    source: string;
    multimedia: NYTMultimedia[];
    headline: NYTHeadline;
    pub_date: string;
    document_type: string;
    news_desk: string;
    section_name: string;
    byline: NYTByline;
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
}

export interface NYTResponse {
    status: string;
    copyright: string;
    response: {
        docs: NYTArticle[];
        meta: {
            hits: number;
            offset: number;
            time: number;
        };
    };
}

export interface NYTParams {
    q?: string;
    fq?: string;
    begin_date?: string;
    end_date?: string;
    sort?: 'newest' | 'oldest' | 'relevance';
    page?: number;
    facet?: boolean;
    category?:string;
    facet_fields?: string[];
}