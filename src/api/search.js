import request from '@/utils/request'

// 封装联想建议接口
export const getSuggestion = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: { q }
  })
}

// 封装搜索结果接口
export const getResult = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params
  })
}
