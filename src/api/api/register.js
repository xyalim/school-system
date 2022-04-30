import request from '@/utils/request'

const prefix = '/register'

/**
 * @description 注册
 */
export function register(data) {
  return request({
    url: `${prefix}/index/index`,
    method: 'post',
    data
  })
}

/**
 * @description 获取学院和相应专业列表
 */
export function getDepartmentList(data) {
  return request({
    url: `${prefix}/getDepartmentList`,
    method: 'post',
    data
  })
}

/**
 * @description 根据专业id返回相应的班级
 * @param {number} major_id
 */
export function getClassList(params) {
  return request({
    url: `${prefix}/getClassList`,
    method: 'get',
    params
  })
}
