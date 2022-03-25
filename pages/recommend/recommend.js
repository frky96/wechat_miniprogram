import {
  reqRecommendSongs
} from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendSongs: []
  },
  async getRecommendSongs() {
    const result = await reqRecommendSongs()
    if (result.code === 200) {
      this.setData({
        recommendSongs: result.recommend
      })
    } else if (result.code === 301) {
      wx.showToast({
        title: result.msg,
        icon: 'none',
        success() {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
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
    this.getRecommendSongs()
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