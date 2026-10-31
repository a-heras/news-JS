import Loader from './loader';

export class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL ?? '', {
            apiKey: process.env.API_KEY,
        });
    }
}

export default AppLoader;