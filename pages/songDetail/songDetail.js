import pubsub from 'pubsub-js'
import moment from 'moment'
import {
  reqSongDetail,
  reqSongUrl
} from '../../utils/request'
const appIns = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    isPlayDelay: false,
    musicId: '',
    songDetail: {},
    currentTime: '00:00',
    totalTime: '00:00',
    songPercent: ''
  },
  async getSongDetail(ids) {
    const result = await reqSongDetail({
      ids
    })
    if (result.code === 200) {
      this.setData({
        songDetail: result.songs[0],
        totalTime: moment(result.songs[0].dt).format('mm:ss')
      })
      wx.setNavigationBarTitle({
        title: this.data.songDetail.name,
      })
    }
  },
  handleMusicPlay() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    if (this.data.isPlayDelay) {
      this.setData({
        isPlayDelay: !this.data.isPlayDelay
      })
    } else {
      setTimeout(() => {
        this.setData({
          isPlayDelay: !this.data.isPlayDelay
        })
      }, 600);
    }
    this.musicControl(this.data.musicId, this.data.isPlay, this.data.musicLink)
  },
  async musicControl(id, isPlay, musicLink) {
    if (isPlay) {
      if (!musicLink) {
        const result = await reqSongUrl({
          id
        })
        if (result.code === 200) {
          musicLink = result.data[0].url
          this.setData({
            musicLink
          })
        }
      }
      this.theMusic.src = this.data.musicLink
      this.theMusic.title = this.data.songDetail.name
    } else this.theMusic.pause()
  },
  switchSong(e) {
    let type = e.currentTarget.id
    this.theMusic?.stop()
    pubsub.subscribe('sendNewId', async (_, id) => {
      this.getSongDetail(id)
      this.musicControl(id, true)
      pubsub.unsubscribe('sendNewId')
    })
    pubsub.publish('changeSong', type)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      musicId: options.songId
    })
    this.getSongDetail(options.songId)

    if (appIns.globalData.isMusicPlay && appIns.globalData.musicId === options.songId) {
      this.setData({
        isPlay: true,
        isPlayDelay: true
      })
    }

    this.theMusic = wx.getBackgroundAudioManager()
    this.theMusic.onPlay(() => {
      this.setData({
        isPlay: true,
      })
      setTimeout(() => {
        this.setData({
          isPlayDelay: true
        })
      }, 600);
      appIns.globalData.isMusicPlay = true
      appIns.globalData.musicId = this.data.musicId
    })
    this.theMusic.onPause(() => {
      this.setData({
        isPlay: false,
        isPlayDelay: false
      })
      appIns.globalData.isMusicPlay = false
    })
    this.theMusic.onStop(() => {
      this.setData({
        isPlay: false,
        isPlayDelay: false
      })
      appIns.globalData.isMusicPlay = false
    })
    this.theMusic.onEnded(() => {
      PubSub.publish('changeSong', 'next')
      this.setData({
        songPercent: '',
        currentTime: '00:00'
      })
    });
    this.theMusic.onTimeUpdate(() => {
      let currentTime = moment(this.theMusic.currentTime * 1000).format('mm:ss')
      let songPercent = (((this.theMusic.currentTime) / (this.theMusic.duration)) * 100) + '%'
      this.setData({
        currentTime,
        songPercent
      })
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