// 封装 用户登录相关的接口

// 导入request.js中的request
import request from '@/utils/request.js'

// 登录接口
export const login = (data) => {
  return request({
    url: 'app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取验证码接口
export const sendSms = (mobile) => {
  return request({
    url: '/app/v1_0/sms/codes/' + mobile,
    method: 'GET'
  })
}
