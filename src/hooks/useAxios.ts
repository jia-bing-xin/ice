import { serviceFn } from '@/config/axios'

import type { AxiosPromise } from 'axios'

import { setConfig } from '@/config/axios/config'

export const useAxios = async (pathUrl?) => {
  const service = await serviceFn(pathUrl)

  const { default_headers } = await setConfig()

  const request = (option): AxiosPromise => {
    const { url, method, params, data, headersType, responseType, timeout } = option
    return service({
      url: url,
      method,
      params,
      data,
      responseType: responseType,
      headers: {
        'Content-Type': headersType || default_headers
      },
      timeout: timeout
    })
  }

  function getFn(option): AxiosPromise {
    return request({ method: 'get', ...option })
  }

  function postFn(option): AxiosPromise {
    return request({ method: 'post', ...option })
  }

  function deleteFn(option): AxiosPromise {
    return request({ method: 'delete', ...option })
  }

  function putFn(option): AxiosPromise {
    return request({ method: 'put', ...option })
  }

  return {
    get: getFn,
    post: postFn,
    delete: deleteFn,
    put: putFn
  }
}
