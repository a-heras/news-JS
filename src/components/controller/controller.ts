import AppLoader from './appLoader';
import type {
    NewsResponse,
    SourcesResponse,
    ResponseCallback,
} from '../../types/news';

export class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'mocks/sources',
            },
            callback
        );
    }

    public getNews(
        e: MouseEvent,
        callback: ResponseCallback<NewsResponse>
    ): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId ?? '');

                    document
                        .querySelectorAll<HTMLElement>('.source__item')
                        .forEach((el) => el.classList.remove('active'));
                    target.classList.add('active');

                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'mocks/everything',
                            options: {
                                sources: sourceId ?? '',
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;