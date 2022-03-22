//发送ajax请求

export const reqBanner = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:3000/banner?type=2',
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

export const reqPersonalized = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:3000/personalized?limit=10',
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

export const reqListData = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:3000/top/list',
      data,
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}