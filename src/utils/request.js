import axios from 'axios'

import { message } from 'antd'

// 关闭定时的函数
let hide = undefined
const loading = () => {
  hide = message.loading('加载中...', 0)
}

const success = () => {
  message.success('数据加载成功！')
}

const error = () => {
  message.error('数据加载失败！')
}

// create an axios instance
const service = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    loading()
    return config
  },
  err => {
    hide()
    error()
    Promise.reject(err)
  }
)

// respone interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    // 如果当前请求是为了获取logo和name，则报错时不显示出来
    hide()
    success()
    const res = response.data
    return res
  },
  err => {
    hide()
    error()
    return Promise.reject(err)
  }
)

export default service
