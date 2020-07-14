// 引入request
import request from '@/utils/request'

// 封装获取文章列表数据的接口
export const getArticleList = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}

// 封装获取文章详情接口
export const getArticleById = articleId => {
  return request({
    url: '/app/v1_0/articles/' + articleId,
    method: 'GET'
  })
}
