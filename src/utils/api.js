import request from '@src/utils/request'

export const getTopics = data => {
  return request({
    url: '/topics',
    method: 'get',
    params: data
  })
}

export const getTopicById = id => {
  return request({
    url: `/topic/${id}`,
    method: 'get'
  })
}

export const getUserByName = loginname => {
  return request({
    url: `/user/${loginname}`,
    method: 'get'
  })
}
