const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:String,
    icon:String,
    unLoginIcon:'/images/unloginIcon.png',
    hasLogin:false,
    userInfo:null,
    openId:app.globalData.openId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  register:function(e){
    console.log(e)
    if (!this.data.hasLogin && e._userTap==true) {
      this.setData({
        hasLogin: true,
        icon: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        nickName:e.detail.userInfo.nickName
      })
    }else{
      wx.showToast({
        title: '已拒绝授权,无法登录',
        icon:'none'
      })
    }
  },
  toMyPublish:function(){
    wx.navigateTo({
      url: '/pages/my_publish/my_publish'
    })
  },
  toFinished:function(){
    wx.navigateTo({
      url:'/pages/finished/finished'
    })
  },
  getOpenid: function () {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        app.globalData.openid = res.result.openid;
      }
    })
  },
  getAuth:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        icon: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        hasLogin: true
      })
    }
    else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.setData({
                  userInfo: res.userInfo,
                  icon: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  hasLogin: true
                })
              }
            })
          }
        }
      })
    }
  },
  onLoad: function (options) {
    this.getAuth();
    this.getOpenid();
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