// 引入vue
import Vue from 'vue'

// 引入dayjs，处理相对时间
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器，处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
