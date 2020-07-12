// 导入axios
import axios from 'axios'

// 导入store.js
import store from '@/store'
// 配置axios的基准路径
const request = axios.create({
  // 基础路径
  baseURL: ' http://ttapi.research.itcast.cn/'
})

// 配置请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = 'Bearer ' + user.token
    }
    return config
  },
  function (error) {
    // 错误处理
    return Promise.reject(error)
  }
)

// 导出
export default request
