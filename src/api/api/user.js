import request from '@/utils/request'

const prefix = '/user'

/**
 * @description 获取用户信息
 */
export function getUserInfo(params) {
  return request.post(`${prefix}/myinfo`)
}
