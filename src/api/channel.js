import request from '@/utils/request'

// 封装获取所有频道接口
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

// 封装添加频道的接口
export const addUserChannel = channels => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels
    }
  })
}

// 封装删除频道接口
export const deleteUserChannel = id => {
  return request({
    url: '/app/v1_0/user/channels/' + id,
    method: 'DELETE'
  })
}
