export const getHttpByMarket = async (code = 'PSGCC') => {
  return code
}
//通过环境获取省间内网不同环境
export const getProInnerHttp = (env?) => {
  switch (env) {
    case 'base':
      return 'http://192.168.206.242:22001'
    case 'dev':
      return 'http://192.168.206.242:22001'
    case 'pro':
      return 'http://192.168.206.106:22001'
    case 'test':
      return 'http://192.168.206.106:22001'
    default:
      return 'http://192.168.206.242:22001'
  }
}
// 通过环境获取省间不同环境
export const getProOutHttp = async () => {
  return await getHttpByMarket('PSGCC')
}
