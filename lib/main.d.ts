type Mutation = "POST" | "PUT" | "DELETE" | "PATCH";
type ValidUrl = `http://${string}` | `https://${string}`;
export declare const fetcher: <T>({ baseUrl, token, }: {
    baseUrl: ValidUrl;
    token?: string;
}) => Promise<T>;
export declare const mutation: <T>({ baseUrl, token, method, }: {
    baseUrl: ValidUrl;
    token?: string;
    method: Mutation;
}) => Promise<T>;
export {};
