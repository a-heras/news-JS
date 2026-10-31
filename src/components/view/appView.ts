import News from './news/news';
import Sources from './sources/sources';
import type { NewsResponse, SourcesResponse } from '../../types/news';

export class AppView {
    private readonly news: News;

    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        const values: NewsResponse = data?.articles ? data : { articles: [], status: 'ok', totalResults: 0 };
        this.news.draw(values);
    }

    public drawSources(data: SourcesResponse): void {
        const values: SourcesResponse = data?.sources ? data : { sources: [], status: 'ok' };
        this.sources.draw(values);
    }
}

export default AppView;
