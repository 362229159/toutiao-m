// 导入axios
import axios from 'axios'

// 配置axios
const request = axios.create({
  // 基础路径
  baseURL: ' http://ttapi.research.itcast.cn/'
})

// 导出
export default request
