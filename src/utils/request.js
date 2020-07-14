// 导入axios
import axios from 'axios'

// 导入store.js
import store from '@/store'

// 导入json.init
import jsonBig from 'json-bigint'

// var json = '{ "value" : 9223372036854775807, "v2": 123 }'
// console.log(jsonBig.parse(json))

// 配置axios的基准路径
const request = axios.create({
  // 基础路径
  baseURL: ' http://ttapi.research.itcast.cn/',
  // transformResponse 自定义处理原始后端返回的数据
  transformResponse: [
    function (data) {
      try {
        // 转换成功，返回成功数据
        return jsonBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})

// 配置请求拦截器
request.interceptors.request.use(
  config => {
    // store.state = user: {},   进行解构
    const { user } = store.state
    // 更严谨的判断
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
