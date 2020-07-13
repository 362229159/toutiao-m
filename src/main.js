import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import './styles/index.less'
// 导入Vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入amfe-flexible，配置移动端rem基准值
import 'amfe-flexible'
// 导入相对时间过滤器
import './utils/dayjs'
// 注册Vant
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
