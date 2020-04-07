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
    if (!this.data.hasLogin) {
      this.setData({
        hasLogin: true,
        icon: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        nickName:e.detail.userInfo.nickName
      })
    }
  },
  getOpenid: function () {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        app.globalData.openid = res.result.openid;
      }
    })
  },
  onLoad: function (options) {
    wx.getSetting({
      success:res=>{
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:res=>{
              this.setData({
                userInfo:res.userInfo,
                icon:res.userInfo.avatarUrl,
                hasLogin:true,
                nickName:res.userInfo.nickName
              })
            }
          })
        }
      }
    })
    this.getOpenid();
    console.log(this.data.userInfo.avatarUrl);
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