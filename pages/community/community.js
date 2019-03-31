// pages/community/community.js
//获取应用实例
const app = getApp()
Page({  

  /**
   * 页面的初始数据
   */
  data: { 
    message: [],
    navbar: ['免费资源', '交换资源', '未来校友'],
    currentTab: 0,
    nickName: undefined,
    avatarUrl: undefined,
    text: undefined,
  },

  /**
   * 页面加载处理函数--显示第一分类信息
   */
  onLoad: function() {
    var that = this;
    //发送请求
    wx.request({
      url: 'http://127.0.0.1:8080/messageList', //接口地址
      data: {
        typeid: 0
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
          messageList: res.data,
        });
      }
    })
  },

  /**
   * 分类导航事件处理函数--按分类显示信息
   */
  getMessage: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index,
    });
    var that = this;
    var typeid = that.data.currentTab;
    //发送请求
    wx.request({
      url: 'http://127.0.0.1:8080/messageList', //接口地址
      data: {
        typeid: typeid
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
          messageList: res.data,
        });
      }
    })
  },

  /**
   * 登录事件处理函数--获取用户授权
   */
  login: function(res) {    
    var that = this;     // 查看是否授权
    wx.getSetting({      
      success(res) {        
        if (res.authSetting['scope.userInfo']) { 
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({    
            success: function(res) {                 
              that.setData({                  
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
              });
            }          
          })        
        }      
      }    
    })
  },

  /**
   * 表单提交事件处理函数--添加留言
   */
  formSubmit: function(e) {    
    var that = this;
    var typeid = that.data.currentTab;
    var headimg = that.data.avatarUrl;
    var nickName = that.data.nickName;
    var text = e.detail.value.text;
    if (nickName != undefined && typeid != undefined) {
      //发送请求
      wx.request({
        url: 'http://127.0.0.1:8080/addMessage', //接口地址
        method: 'post',
        data: {
          typeid: typeid,
          nickname: nickName,
          headimg: headimg,
          text: text,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function(res) {
          that.setData({
            text: ''
          });
          var result = res.data;
          var toastText = "留言成功";
          if (result != 1) {
            toastText = "留言失败";
          }
          wx.showToast({
            title: toastText,
            duration: 2000,
          });
        }
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function() {    
    wx.showNavigationBarLoading();    
    var that = this;
    var typeid = that.data.currentTab;
    //发送请求
    wx.request({
      url: 'http://127.0.0.1:8080/messageList', //接口地址
      data: {
        typeid: typeid
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
        console.log(res.data);
        that.setData({
          messageList: res.data,
        });
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();        
        // 停止下拉动作
        wx.stopPullDownRefresh();      
      }    
    })  
  },

})