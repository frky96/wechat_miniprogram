import {
  reqUserRecord
} from '../../utils/request'

let startY = 0
let endY = 0
let distance = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTranstion: '',
    userInfo: null,
    userRecord: []
  },

  handleTouchstart(e) {
    startY = e.touches[0].clientY
    this.setData({
      coverTranstion: ''
    })
  },
  handleTouchmove(e) {
    endY = e.touches[0].clientY
    distance = endY - startY
    if (distance < 0) return
    if (distance > 80) distance = 80
    this.setData({
      coverTransform: `translateY(${distance}rpx)`
    })
  },
  handleTouchend(e) {
    this.setData({
      coverTransform: `translateY(0)`,
      coverTranstion: 'transform 0.5s linear'
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  async getUserRecord() {
    const result = await reqUserRecord({
      uid: this.data.userInfo.userId,
      type: 0
    })
    if (result.code === 200) {
      let index = 0
      let userRecord = result.allData.splice(0, 10).map(item => {
        item.myId = index++
        return item
      })
      this.setData({
        userRecord
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
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: JSON.parse(userInfo)
    })
    this.getUserRecord()
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