const app=getApp();
Page({
  data: {
    user:{
      userInfo: null,
      hasLogin: false,
      unloginIcon: "/imgs/unloginIcon.png"
    }
  },
  getUserInfo:function(res){
    wx.getUserInfo({
      success:e => {
        wx.showToast({
          title: "登陆成功,欢迎您\n"
          +e.userInfo.nickName,
          icon: 'none',
          duration: 2000
        })
        this.setData({
          user: {
            userInfo: e.userInfo,
            hasLogin: true,
          }
        })
        
      },
      fail:function(){
        wx.showToast({
          title: "登陆失败",
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo!=null){
      this.setData({
        user:{
          userInfo:app.globalData.userInfo,
          hasLogin:true
        }
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          user:{
            userInfo: res.userInfo,
            hasLogin: true
          }
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            user: {
              userInfo: res.userInfo,
              hasLogin: true
            }
          })
        }
      })
    }
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