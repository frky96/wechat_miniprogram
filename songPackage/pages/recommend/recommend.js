import pubsub from 'pubsub-js'
import {
  reqRecommendSongs
} from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendSongs: [],
    index: ''
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
  navigateToSongDetail(e) {
    const {
      id,
      index
    } = e.currentTarget.dataset
    this.setData({
      index
    })
    wx.navigateTo({
      url: `/songPackage/pages/songDetail/songDetail?songId=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth() + 1
    })
    pubsub.subscribe('changeSong', (_, type) => {
      let {
        recommendSongs,
        index
      } = this.data
      switch (type) {
        case 'prev':
          index -= 1
          break;
        case 'next':
          index += 1
          break;
      }
      this.setData({
        index
      })
      let musicId = recommendSongs[index].id
      pubsub.publish('sendNewId', musicId)
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
    pubsub.unsubscribe('changeSong')
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