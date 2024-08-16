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
export const mutation = async ({ baseUrl, token, method, }) => {
    const response = await fetch(baseUrl, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to perform mutation");
    }
    const data = await response.json();
    return data;
};
