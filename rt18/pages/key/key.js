Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodeToWX:""
  },

  direct:function(){
    var that = this;
    wx.request({
      url: "http://www.ourspark.cn:3000/user",
      data:{
        name:'open'
      },
      success: function (res) {
        that.setData({
          nodeToWX: 'You are succeeded! Plesse wait!'
        });
        console.log(res);
      },
      fail:function(){
        that.setData({
          nodeTowX:'You are failed! Please try again!'
        })
      }
    });

  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 1) {
            that.chooseWxImage('album')
          }
           else if(res.tapIndex == 0) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths,
        }),
        function () {
          var CryptoJS = require('../../../lib/crypto-js/crypto-js');//引用加密算法库 
          var now = Math.floor(Date.now() / 1000);
          var expired = now + 1000;//生成签名时间戳
          var secret_src = 'a=' + app.globalData.appid + '&b=' + '&k=' + app.globalData.secretid + '&e=' + expired + '&t=' + now + '&r=' + '123' + '&f=';//拼接签名字符串
          var auth_b = CryptoJS.HmacSHA1(secret_src, app.globalData.secret).concat(CryptoJS.enc.Utf8.parse(secret_src));
          var auth = auth_b.toString(CryptoJS.enc.Base64);//生成签名
          var that = this;
          wx.uploadFile({//上传图片及签名至指定api地址
            url: 'https://recognition.image.myqcloud.com/face/compare',
            filePath: that.data.tempFilePaths[0],
            name: 'imageA',
            header: {
              'authorization': auth
            },
            formData: {
              'appid': app.globalData.appid,
              'urlB': 'http://xxxxxxxxxxxxxx' //我自己的照片必然不能放出来~
            },
            success: function (res) {
              console.log(res)
              var data = JSON.parse(res.data)
              if (data.data.similarity >= 60.0) {
                wx.request({
                  url: "http://www.ourspark.cn:3000/user",
                  data: {
                    name: 'open'
                  },
                  success: function (res) {
                    that.setData({
                      nodeToWX: 'You are succeeded! Plesse wait!'
                    });
                    console.log(res);
                  },
                  fail: function () {
                    that.setData({
                      nodeTowX: 'You are failed! Please try again!'
                    })
                  }
                })
              }
              else{
                wx.request({
                  url: "http://www.ourspark.cn:3000/user",
                  data: {
                    name: 'open'
                  },
                  success: function (res) {
                    that.setData({
                      nodeToWX: 'You are succeeded! Plesse wait!'
                    });
                    console.log(res);
                  },
                  fail: function () {
                    that.setData({
                      nodeTowX: 'You are failed! Please try again!'
                    })
                  }
                })
              }

            }
          })
        }
      }
    })
  },
    speak:function(){
      wx.startRecord({
        success: function(res) {
          var tempFilePath = res.tempFilePath
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      setTimeout(function(){
        wx.stopRecord()
      },10000)
      this.setData({
        judge:1
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      content: '欢迎使用智能门锁！如需语音识别，请说一段话。如需人脸认证，请用摄像头拍摄您的照片。',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消'),
            wx.navigateTo({
              url: '../index/index',
            })
        }
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