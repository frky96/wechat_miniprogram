import {
  regPhone,
  regPwd
} from '../../utils/regExp'
import {
  reqLogin
} from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    password: ''
  },

  handleInput(e) {
    let {
      value
    } = e.detail
    switch (e.target.id) {
      case 'phoneNum':
        if (regPhone.test(value)) {
          return this.setData({
            phoneNum: value
          })
        }
        this.setData({
          phoneNum: ''
        })
        break
      case 'password':
        if (regPwd.test(value)) {
          return this.setData({
            password: value
          })
        }
        this.setData({
          password: ''
        })
        break
    }
  },
  async login() {
    const {
      phoneNum,
      password
    } = this.data
    if (!(phoneNum && password)) {
      return wx.showToast({
        title: '手机号或密码格式错误',
        icon: 'none'
      })
    }
    const result = await reqLogin({
      phone: phoneNum,
      password
    })
    if (result.code === 200) {
      wx.showToast({
        title: '登录成功',
      })
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      return wx.reLaunch({
        url: '/pages/personal/personal',
      })
    } else {
      return wx.showToast({
        title: result.msg,
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})