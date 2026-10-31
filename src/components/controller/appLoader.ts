import Loader from './loader';

export class AppLoader extends Loader {
    constructor() {
        const isProd = process.env.NODE_ENV === 'production';
        const baseUrl = isProd
            ? 'https://rss-news-api.onrender.com'
            : '/api-proxy';

        super(baseUrl, {
            apiKey: process.env.API_KEY ?? '',
        });
    }
}

export default AppLoader;