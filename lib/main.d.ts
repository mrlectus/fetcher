type Mutation = "POST" | "PUT" | "DELETE" | "PATCH";
type ValidUrl = `http://${string}` | `https://${string}`;
export declare const fetcher: <T>({ baseUrl, token, }: {
    baseUrl: ValidUrl;
    token?: string;
}) => Promise<T>;
export declare const mutation: <T>({ baseUrl, token, method, payload, }: {
    baseUrl: ValidUrl;
    token?: string;
    method: Mutation;
    payload: RequestInit["body"];
}) => Promise<T>;
export {};
