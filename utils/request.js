//发送ajax请求

import {
  localhost
} from './constant'

export const reqBanner = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/banner?type=2',
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

export const reqPersonalized = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/personalized?limit=10',
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

export const reqListData = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/top/list',
      data,
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}

export const reqLogin = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/login/cellphone',
      data,
      success: (res) => {
        wx.setStorage({
          key: 'cookies',
          data: res.cookies
        })
        resolve(res.data)
      },
      fail: (err) => reject(err)
    })
  })
}

export const reqUserRecord = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/user/record',
      data,
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}

export const reqVideoGroupList = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/video/group/list',
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}

export const reqVideoGroup = (data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/video/group',
      data,
      header: {
        cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.includes('MUSIC_U')) : ''
      },
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}

export const reqRecommendSongs = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: localhost + '/recommend/songs',
      header: {
        cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.includes('MUSIC_U')) : ''
      },
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}