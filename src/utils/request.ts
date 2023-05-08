import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

const instance = axios.create({
    timeout: 5000,
});

instance.interceptors.request.use(
    function (config) {
        NProgress.start();
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        NProgress.done();
        return response;
    },
    function (error) {
        NProgress.done();
        return Promise.reject(error);
    }
);

//
export function get(url: string, params: any) {
    return instance.get(url, { params });
}

export function post(url: string, data: any) {
    return instance.post(url, data);
}

export function del(url: string, data: AxiosRequestConfig<any> | undefined) {
    return instance.delete(url, data);
}