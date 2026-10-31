import Loader from './loader';

export class AppLoader extends Loader {
    constructor() {
        const baseUrl = process.env.API_URL ?? '/api-proxy';
        super(baseUrl, {
            apiKey: process.env.API_KEY ?? '',
        });
    }
}

export default AppLoader;