// pages/notes/notes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notesList: null,
  },

  /**
   * 生命周期函数--监听页面加载，获取用户唯一标识
   */
  onLoad: function(options) {
    var that = this;
    wx.login({
      success: function(res) {
        var code = res.code;
        //发送请求
        wx.request({
          url: 'http://127.0.0.1:8080/login', //接口地址
          data: {
            code: code
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function(res) {
            wx.showToast({
              title: '登录成功',
              duration: 1000,
            })
            wx.setStorageSync('userid', res.data);
          }
        })
      }
    })
  },

  /**
   * 点击事件函数--显示便签信息
   */
  getNotesList: function() {
    var that = this;
    var userid = wx.getStorageSync('userid');
    //发送请求
    wx.request({
      url: 'http://127.0.0.1:8080/notesList', //接口地址
      data: {
        userid: userid
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        var length = res.data.length;
        for (var i = 0; i < length; i++) {
          res.data[i].createtime = res.data[i].createtime.substring(0, 19);
          res.data[i].createtime = res.data[i].createtime.replace(/T/, ' ');
        }
        that.setData({
          notesList: res.data,
        });
      }
    })
  },
  
  /**
   * 点击事件--跳转到便签更新页
   */
  toModifyNote: function(e) {
    var noteid = e.currentTarget.dataset.noteid;
    if (noteid != undefined) {
      wx.navigateTo({
        url: '/pages/modifyNote/modifyNote?noteid=' + noteid,
      })
    } else {
      wx.navigateTo({
        url: '/pages/modifyNote/modifyNote',
      })
    }
  },

  /**
   * 点击事件--删除便签
   */
  deleteNote: function(e) {
    var that = this;
    var noteid = e.currentTarget.dataset.noteid;
    //发送请求
    wx.request({
      url: 'http://127.0.0.1:8080/deleteNotes', //接口地址
      data: {
        noteid: noteid
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        var result = res.data;
        var toastText = "删除成功";
        console.log(result);
        if (result == 0) {
          toastText = "删除失败";
        } else {
          that.data.notesList.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            notesList: that.data.notesList,
          });
        }
        wx.showToast({
          title: toastText,
          duration: 2000,
        })
      }
    })
  }
})