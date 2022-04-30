import request from '@/utils/request'

const prefix = '/feedback'

/**
 * @description 添加意见反馈
 * @param {string} title
 * @param {string} content
 */
export function addFeedback(data) {
  return request({
    url: `${prefix}/addFeedback`,
    method: 'post',
    data
  })
}

/**
 * @description 查看意见反馈列表
 */
export function FeedbackList(data) {
  return request({
    url: `${prefix}/FeedbackList`,
    method: 'post',
    data
  })
}

/**
 * @description 根据id查看反馈内容
 * @param {number} id
 */
export function feedbackDetail(params) {
  return request({
    url: `${prefix}/feedbackDetail`,
    method: 'get',
    params
  })
}
