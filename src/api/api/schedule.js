import request from '@/utils/request'

const prefix = '/schedule'

/**
 * @description 学生课程列表
 */
export function scheduleStudentList(data) {
  return request({
    url: `${prefix}/scheduleStudentList`,
    method: 'post',
    data
  })
}

/**
 * @description 老师课程列表
 */
export function scheduleTeachertList(data) {
  return request({
    url: `${prefix}/scheduleTeachertList`,
    method: 'post',
    data
  })
}

/**
 * @description 根据课程id查询该课程下所有学生信息列表
 * @param {number} id
 */
export function StudentList(params) {
  return request({
    url: `${prefix}/StudentList`,
    method: 'get',
    params
  })
}
