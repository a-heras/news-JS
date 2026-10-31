import type { RequestParams, ResponseCallback, HttpMethod } from '../../types/news';

export interface LoaderOptions {
    apiKey?: string;
    [key: string]: string | number | boolean | undefined;
}

export interface GetRespParams {
    endpoint: string;
    options?: Partial<RequestParams>;
}

export class Loader {
    private readonly baseLink: string;

    private readonly options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: GetRespParams,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<RequestParams>, endpoint: string): string {
        const urlOptions: LoaderOptions = { ...this.options, ...options };
        const filtered: LoaderOptions = {};
        Object.keys(urlOptions).forEach((key: string) => {
            const value = urlOptions[key];
            if (value !== undefined && value !== '') {
                filtered[key] = value;
            }
        });

        const base = this.baseLink.endsWith('/') ? this.baseLink : `${this.baseLink}/`;
        const ep = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

        let url = `${base}${ep}?`;
        Object.keys(filtered).forEach((key: string) => {
            url += `${key}=${filtered[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: string,
        callback: ResponseCallback<T>,
        options: Partial<RequestParams> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;