import request from '@/utils/request'

const prefix = '/message'

/**
 * @description 消息列表
 * @param {number} vacate_id
 */
export function messageList(data) {
  return request({
    url: `${prefix}/messageList`,
    method: 'post',
    data
  })
}

/**
 * @description 根据id查看消息详情
 * @param {number} id
 */
export function messageDetail(params) {
  return request({
    url: `${prefix}/messageDetail`,
    method: 'get',
    params
  })
}

/**
 * @description 发送消息
 * @param {number} type
 * @param {string} message_title
 * @param {string} message_content
 */
export function sendMessage(params) {
  return request({
    url: `${prefix}/sendMessage`,
    method: 'post',
    params
  })
}
