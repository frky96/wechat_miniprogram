// pages/search/search.js
import {
  reqSearchDefault,
  reqSearchHot,
  reqSearch
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchDefault: '',
    hotList: [],
    keywords: '',
    searchList: [],
    historyList: []
  },
  async getInitialData() {
    const result = await reqSearchDefault()
    if (result.code === 200) {
      this.setData({
        searchDefault: result.data.realkeyword
      })
    }
    const result2 = await reqSearchHot()
    if (result2.code === 200) {
      this.setData({
        hotList: result2.data
      })
    }
  },
  getKeyword(e) {
    let keywords = e.detail.value.trim()
    this.setData({
      keywords
    })
    if (!keywords) return
    clearTimeout(this.timer)
    // if (this.timer) return 
    this.timer = setTimeout(async () => {
      const result = await reqSearch({
        keywords,
        limit: 10
      })
      if (result.code === 200) {
        this.setData({
          searchList: result.result.songs,
          historyList: [...this.data.historyList, keywords]
        })
      }
      this.timer = null
    }, 200);
  },
  handleCancel() {
    this.setData({
      keywords: ''
    })
  },
  handleDelete() {
    wx.showModal({
      cancelColor: '#d43c33',
      content: 'sure',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            historyList: []
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitialData()
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