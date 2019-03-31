// pages/detail/detail.js
Page({

  /**
   * 页面原始数据
   */
  data: {
    schoolMessage: null,
    schoolName:null,
  },

  /**
   * 页面加载事件--获取内存中的信息
   */
  onLoad: function (name) {
    var index = wx.getStorageSync('index');
    var name = wx.getStorageSync('name');
    this.getSchoolDetail(index);
    this.setData({
      schoolName : name,
    })
  },

  /**
   * 加载函数--获取学校详细信息
   */
  getSchoolDetail: function (index) {
    var getData = require("../../utils/data.js");
    var schoolMessage = getData.outData.schoolDetail[index];
    this.setData({
      schoolMessage : schoolMessage,
    });
  },

  /**
   * 点击事件--用户复制网页的路径url
   */
  copyUrl: function(e){
    var url = e.currentTarget.dataset.variable;
    wx.setClipboardData({
      data: url,
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