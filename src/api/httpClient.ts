import axios, { AxiosPromise } from "axios";

const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});

export type ClientResponseType<T> = AxiosPromise<T>;

export default client;
