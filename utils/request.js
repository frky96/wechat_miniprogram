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
      success: (res) => resolve(res.data),
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