/*
 * @Author: zhouchenchen
 * @Description:
 * @Date: 2022-06-21 16:23:58
 * @LastEditTime: 2023-05-04 09:34:45
 */
import { getHttpByMarket, getProInnerHttp, getProOutHttp } from '@/config/https'

const setConfig = async () => {
  const opt: {
    base_url: {
      base: string
      proInnerBase: string
      proOutBase: string
      dev: string
      proInnerDev: string
      proOutDev: string
      pro: string
      proInnerPro: string
      proOutPro: string
      test: string
      proInnerTest: string
      proOutTest: string
    }
    result_code: number | string
    default_headers: string
    request_timeout: number
  } = {
    /**
     * api请求基础路径
     */
    base_url: {
      // 开发环境接口前缀
      // base: 'http://192.168.201.124:22002',
      base: await getHttpByMarket(),
      proInnerBase: getProInnerHttp('base'),
      proOutBase: await getProOutHttp(),

      // 打包开发环境接口前缀
      dev: await getHttpByMarket(),
      proInnerDev: getProInnerHttp('dev'),
      proOutDev: await getProOutHttp(),

      // 打包生产环境接口前缀
      pro: await getHttpByMarket(),
      proInnerPro: getProInnerHttp('pro'),
      proOutPro: await getProOutHttp(),

      // 打包测试环境接口前缀
      test: await getHttpByMarket(),
      proInnerTest: getProInnerHttp('test'),
      proOutTest: await getProOutHttp()
    },

    /**
     * 接口成功返回状态码
     */
    result_code: '0000',

    /**
     * 接口请求超时时间
     */
    request_timeout: 5,

    /**
     * 默认接口请求类型
     * 可选值：application/x-www-form-urlencoded multipart/form-data
     */
    default_headers: 'application/json'
  }
  return opt
}

export { setConfig }
