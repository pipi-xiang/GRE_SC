// pages/modifyNote/modifyNote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: undefined,
    noteid: undefined,
    details: '',
    addUrl: 'http://127.0.0.1:8080/addNotes',
    editUrl: 'http://127.0.0.1:8080/editNotes',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userid = wx.getStorageSync('userid');
    var that = this;
    that.setData({
      userid: userid,
    });
    var noteid = options.noteid;
    if (options.noteid == undefined) {
      return;
    } else {
      that.setData({
        noteid: noteid,
      });
      //发送请求
      wx.request({
        url: 'http://127.0.0.1:8080/findNote', //接口地址
        data: {
          noteid: noteid
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          console.log(res.data);
          that.setData({
            details: res.data.details,
          });
        }
      })
    }
  },

  /**
   * 表单提交事件处理函数--更新便签
   */
  bindFormSubmit: function(e) {
    var that = this;
    var url = that.data.addUrl;
    var noteid = that.data.noteid;
    var details = e.detail.value.details;
    var userid = e.detail.value.userid;
    if (this.data.noteid != null) {
      url = that.data.editUrl;
    }
    //发送请求
    wx.request({
      url: url, //接口地址
      method: 'post',
      data: {
        details: details,
        userid: userid,
        noteid: noteid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function(res) {
        var result = res.data;
        var toastText = "更新成功";
        if (result == 0) {
          toastText = "更新失败";
        }
        wx.showToast({
          title: toastText,
          duration: 2000,
        });
        
      }
    })
  },
})