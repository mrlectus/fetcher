import { match } from "ts-pattern";

declare function fetch<T = any>(
  input: RequestInfo | URL,
  init?: ExtendedRequestInit,
): Promise<ResponseType<T>>;

interface ResponseType<T> extends Response {
  json(): Promise<T>;
}

type ExtendedRequestInit = RequestInit &
  MethodBody &
  Partial<{ headers: ResponseHeaders }>;

type Mutation = "POST" | "PUT" | "DELETE" | "PATCH";
type Query = "GET";

type MethodBody =
  | {
      method?: Mutation;
      body?: RequestInit["body"];
    }
  | { method?: Query; body?: never };

type ResponseHeaders = RequestInit["headers"] &
  Partial<{
    "Content-Type": string;
    Authorization: `Bearer ${string}`;
    Accept: "application/json" | "text/plain" | "text/html" | "image/png";
  }>;

type ValidUrl = `http://${string}` | `https://${string}`;
export const fetcher = async <T>({
  baseUrl,
  token,
}: {
  baseUrl: ValidUrl;
  token?: string;
}) => {
  const response = await fetch<T>(baseUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const mutation = async <T>({
  baseUrl,
  token,
  method = "POST",
  payload,
}: {
  baseUrl: ValidUrl;
  token?: string;
  method: Mutation;
  payload: RequestInit["body"];
}) => {
  const response = await fetch<T>(baseUrl, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: match(Object.prototype.toString.call(payload))
      .with("[object Object]", () => JSON.stringify(payload))
      .with("[object Map]", () => JSON.stringify(payload))
      .with("[object Array]", () => JSON.stringify(payload))
      .with("[object FormData]", () => payload)
      .otherwise(() => {
        throw new Error("Invalid payload");
      }),
  });
  if (!response.ok) {
    throw new Error("Failed to perform mutation");
  }
  const data = await response.json();
  return data;
};
