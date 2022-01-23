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
    userInfo:Array,
    openId:app.globalData.openId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //点击按钮弹出登陆授权弹窗
  login:function(e){
    wx.getUserProfile({
      desc: '登陆',
      success: res => {
        let userInfo=res.userInfo;
        app.globalData.userInfo=userInfo
        console.log(userInfo)
        this.setData({
          hasLogin:true,
          userInfo:userInfo,
          icon:userInfo.avatarUrl,
          nickName:userInfo.nickName
        })
      }
    })
    
  },
  //跳转至my_publish
  toMyPublish:function(){
    if (!this.data.userInfo){
      wx.showToast({
        title: '请登录后查看',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/my_publish/my_publish'
      })
    }
  },
  //调用云函数获取openid
  getOpenid: function () {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        app.globalData.openid = res.result.openid;
      }
    })
  },
  //先看app获取到用户信息没，如果有就直接用app的，没有就自己获取
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
      //获取用户信息
      wx.getUserProfile({
        desc: '登陆',
        success: res => {
          app.globalData.userInfo=res.userInfo
          this.setData({
            hasLogin:true,
            userInfo:res.userInfo
          })
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