import axios, { AxiosPromise } from "axios";

const apiBase = process.env.NODE_ENV === "production"
    ? "https://example.com"
    : "http://localhost:3000";

const headersConfig = {
    "Content-type": "application/json; charset=UTF-8",
};

const client = axios.create({
    baseURL: `${apiBase}/api`,
    headers: headersConfig,
});

export const clientInternal = axios.create({
    baseURL: apiBase,
    headers: headersConfig,
});

export type ClientResponseType<T> = AxiosPromise<T>;

export default client;
