// pages/tools/tools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 统一报考入口url
   */
  copyApply: function () {
    wx.setClipboardData({
      data: 'https://yz.chsi.com.cn/yzwb/',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  /**
   * 初试成绩查询url
   */
  copyScore: function () {
    wx.setClipboardData({
      data: 'https://yz.chsi.com.cn/apply/cjcx/',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  /**
   * 准考证url
   */
  copyTicket: function () {
    wx.setClipboardData({
      data: 'https://yz.chsi.com.cn/yzwb/',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
})