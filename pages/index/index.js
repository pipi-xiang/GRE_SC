//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    schoolList: null,
  },
 
   /**
   * 页面加载事件--调用函数
   */
  onLoad: function () {
    this.getSchoolList();
  },

  /**
   * 页面加载事件--onload前执行，实现倒计时
   */
  onReady: function () {
    var examTime = new Date('2019-12-21 08:30:00');
    var totalSecond = examTime / 1000 - Date.parse(new Date()) / 1000;

    var interval = setInterval(function () {
      // 秒数
      var second = totalSecond;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      this.setData({
        countDay : dayStr,
      })
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '考试已结束',
        });
        this.setData({
          countDay: '00',
        });
      }
    }.bind(this), 1000);
  },

 /**
  * 加载函数--获取学校列表信息
  */
 getSchoolList: function(){
   var getData = require("../../utils/data.js");
   var schoolList = getData.outData.schoolList;
   this.setData({
     schoolList: schoolList,
   });
 },

 /**
  * 点击事件--跳转到学校详情页面
  */
  toDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var schoolList = this.data.schoolList;
    var name = schoolList[index].name;
    wx.setStorageSync('index', index);
    wx.setStorageSync('name', name);
    wx.navigateTo({
        url: '/pages/detail/detail',
      })
  },
})
