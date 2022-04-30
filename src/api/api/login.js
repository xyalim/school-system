import request from '@/utils/request'

const prefix = '/login'
/**
 * @description 登录
 * @param {string} user_number
 * @param {string} password
 */
export function login(params) {
  return request.post(`${prefix}/index/index`, params)
}

