import axios from 'axios'
import { message } from 'antd'

/**
 * 封装axios，实现发送/响应接口的拦截，来实现统一提示等效果
 */

// 封装的loading函数
const loading = () => {
  return message.loading('加载中...', 0)
}
const success = () => {
  message.success('数据加载成功！', 1)
}
const error = () => {
  message.error('数据加载失败！', 1)
}

const service = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 5000 // 请求超时时间限制
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const hide = loading()
    config.transformResponse = [
      data => {
        /**
         * 在获取到接口数据并将之传递给response函数前拦截下，
         * 判断是否请求成功，否的话，展示错误提示
         * 不管如何，都要取消loading效果
         */
        const temp = JSON.parse(data)
        if (!temp.success) {
          error()
        }
        hide()
        return temp
      }
    ]
    return config
  },
  err => {
    error()
    Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    success()
    return response.data
  },
  err => {
    error()
    return Promise.reject(err)
  }
)

export default service
