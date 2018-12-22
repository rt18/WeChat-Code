App({
  onLaunch() {
    console.log('App.onLaunch()');
  },
  onShow: function () {
  },
  onHide: function () {
  },

  //本应用全局数据
  globalData: {
    temperature: {},
    light: {},
    humidity: {},
    appid: "xxxxxxxx",//填写从腾讯云获取的APPID
    secretid: "xxxxxxxxxxx",//填写从腾讯云获取的secretID
    secret: "xxxxxxxxx"//填写从腾讯云获取的APPID
  }
})