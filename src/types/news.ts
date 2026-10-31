export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ResponseCallback<T> = (data: T) => void;

export enum NewsCategory {
    Business = 'business',
    Technology = 'technology',
    Science = 'science',
    Health = 'health',
    Sports = 'sports',
    Entertainment = 'entertainment',
    General = 'general',
}

export interface Source {
    readonly id: string | null;
    readonly name: string;
}

export interface Article {
    source: Source;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
}

export interface SourcesResponse {
    status: 'ok' | 'error';
    sources: Source[];
}

export interface RequestParams {
    category?: NewsCategory;
    pageSize?: number;
    page?: number;
    q?: string;
    country?: string;
    language?: string;
    sources?: string;
}