import request from '@/utils/request'

const prefix = '/vacate'

/**
 * @description 学生申请请假
 * @param {number} schedule_id
 * @param {string} reason
 */
export function apply(data) {
  return request({
    url: `${prefix}/apply`,
    method: 'post',
    data
  })
}

/**
 * @description 查询请假列表
 * @param {number} schedule_id
 * @param {string} reason
 */
export function vacateList(data) {
  return request({
    url: `${prefix}/vacateList`,
    method: 'post',
    data
  })
}

/**
 * @description 教师审核假期
 * @param {number} vacate_id
 * @param {number} status
 * @param {string} teacher_opinion
 */
export function auditVacate(data) {
  return request({
    url: `${prefix}/auditVacate`,
    method: 'post',
    data
  })
}

/**
 * @description 根据id查询请假详情
 * @param {number} vacate_id
 */
export function vacateInfo(params) {
  return request({
    url: `${prefix}/vacateInfo`,
    method: 'get',
    params
  })
}
