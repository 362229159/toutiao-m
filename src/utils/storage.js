// 封装token存储的相关操作

// 存储token
export const setItem = (key, value) => {
  // 判断值是否为对象
  if (typeof value === 'object') {
    // 转为字符串，内存中只能存字符串
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取token
export const getItem = key => {
  var res = window.localStorage.getItem(key)
  if (typeof res === 'object') {
    res = JSON.parse(res)
  }
  return res
}

// 删除token
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
