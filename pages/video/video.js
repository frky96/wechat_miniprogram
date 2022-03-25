import {
  reqVideoGroupList,
  reqVideoGroup
} from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: '',
    videoGroup: [],
    isTriggered: false
  },

  async getVideoGroupList() {
    const result = await reqVideoGroupList()
    if (result.code === 200) {
      this.setData({
        videoGroupList: result.data.slice(0, 14),
        navId: result.data[0].id
      })
      this.getVideoGroup(this.data.navId)
    }
  },
  changeNav(e) {
    this.setData({
      navId: e.target.dataset.id,
      videoGroup: []
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getVideoGroup(this.data.navId)
  },
  async getVideoGroup(id) {
    if (!id) return
    const result = await reqVideoGroup({
      id
    })
    wx.hideLoading()
    if (result.code === 200) {
      let index = 0
      let videoGroup = result.datas.map(item => {
        item.id = index++
        return item
      })
      this.setData({
        videoGroup,
        isTriggered: false
      })
    } else {
      wx.showToast({
        title: result.msg,
        icon: 'none'
      })
    }
  },
  // 视频播放/继续播放
  handlePlay(e) {
    let currentId = e.target.id
    if (this.vid !== currentId) {
      this.videoContext?.stop()
      this.vid = currentId
      this.videoContext = wx.createVideoContext(currentId)
    }
  },
  // scrollView下拉刷新
  handleRefresh() {
    this.getVideoGroup(this.data.navId)
  },
  // scrollView上拉触底
  async handleLower() {
    let newVideoGroup = await reqVideoGroup({
      id: this.data.navId
    })
    this.setData({
      videoGroup: [...this.data.videoGroup, ...newVideoGroup.datas]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    this.getVideoGroup(this.data.navId)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({
    from
  }) {
    return {
      title: 'title',
      page: '/pages/video/video',
      imageUrl: '../../static/images/nvsheng.jpg'
    }
  }
})