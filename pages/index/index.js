// pages/index/index.js
import {
  reqBanner,
  reqPersonalized,
  reqListData
} from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    personalized: [],
    topList: []
  },
  handleTap(e) {
    const {
      id
    } = e.currentTarget
    wx.navigateTo({
      url: `/pages/${id}/${id}`,
    })
  },
  async getBanner() {
    const result = await reqBanner()
    if (result.statusCode === 200) {
      this.setData({
        bannerList: result.data.banners
      })
    }
  },
  async getPersonalized() {
    const result2 = await reqPersonalized()
    if (result2.statusCode === 200) {
      this.setData({
        personalized: result2.data.result
      })
    }
  },
  async getListData() {
    let index = 0
    const arrTopList = []
    while (index < 5) {
      let result3 = await reqListData({
        idx: index++
      })
      if (result3.code === 200) {
        let topListItem = {
          name: result3.playlist.name,
          tracks: result3.playlist.tracks.slice(0, 3)
        }
        arrTopList.push(topListItem)
        this.setData({
          topList: arrTopList
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getBanner()
    this.getPersonalized()
    this.getListData()
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