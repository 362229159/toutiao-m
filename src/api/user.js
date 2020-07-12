// 封装 用户登录相关的接口

// 导入request.js中的request
import request from '@/utils/request.js'
// 导入获取token方法
// import { getItem } from '@/utils/storage.js'
// 导入store
// import store from '@/store'
// console.log(store.state.user)

// 登录接口
export const login = data => {
  return request({
    url: 'app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取验证码接口
export const sendSms = mobile => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile,
    method: 'GET'
  })
}

// 获取用户自己信息接口
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
    // headers: {
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}
