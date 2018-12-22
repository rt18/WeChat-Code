//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    introduce:'您可以点击下方的按钮查看家中的实时数据，或者点击右下方"open"选择语音或图像识别开锁~',
  },

  add:function(e){
    this.setData({
      judge:true,
    })
  },

  validate: function () {
    wx.navigateTo({
      url: '../spy/spy',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        url: 'https://api.heclouds.com/devices/503228701/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
        header: {
          'content-type': 'application/json',
          'api-key': '=On=5iQ=9QI3iXntXoPNNxIDRhE='
        },
        success: function (res) {
          //console.log(res.data)
          //拿到数据后保存到全局数据
          var app = getApp()
          app.globalData.temperature = res.data.data.datastreams[0]
          app.globalData.light = res.data.data.datastreams[1]
          app.globalData.humidity = res.data.data.datastreams[2]
          console.log(app.globalData.light)
        }
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