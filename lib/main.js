import { match } from "ts-pattern";
export const fetcher = async ({ baseUrl, token, }) => {
    const response = await fetch(baseUrl, {
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
export const mutation = async ({ baseUrl, token, method = "POST", payload, }) => {
    const response = await fetch(baseUrl, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            ContentType: "application/json",
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
