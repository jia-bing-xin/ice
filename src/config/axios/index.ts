import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { setConfig } from '@/config/axios/config'
export async function PATH_URL(pathUrl?) {
    const { base_url } = await setConfig()
    if (pathUrl) {
        return base_url[import.meta.env[pathUrl]]
    } else {
        return base_url[import.meta.env.VITE_API_BASEPATH]
    }
}
export async function serviceFn(pathUrl = 'VITE_API_BASEPATH') {
    const { request_timeout } = await setConfig()
    // 创建axios实例
    const service: AxiosInstance = axios.create({
        baseURL: await PATH_URL(pathUrl), // api 的 base_url
        timeout: request_timeout // 请求超时时间
    })
    return service
}