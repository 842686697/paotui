// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:String,
    unLoginIcon:'/images/unloginIcon.png',
    hasLogin:false,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  register:function(e){
    if (!this.data.hasLogin) {
      this.setData({
        hasLogin: true,
        Icon: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onLoad: function (options) {
    
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