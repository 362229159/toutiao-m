import Vue from 'vue'
import Vuex from 'vuex'

// 导入storage.js
// import { setItem, getItem } from '../utils/storage.js'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
// token的key
const tokenKey = 'toutiao_user'

export default new Vuex.Store({
  state: {
    // 获取用户token
    // user: JSON.parse(window.localStorage.getItem(tokenKey))
    user: getItem(tokenKey)
  },
  mutations: {
    setUser (state, user) {
      // 修改state里的数据
      state.user = user
      // 把token保存在本地
      setItem(tokenKey, user)
      // window.localStorage.setItem(tokenKey, JSON.stringify(user))
    }
  },
  actions: {},
  modules: {}
})
