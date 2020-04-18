// miniprogram/pages/my_publish/my_publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    collection:'list',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getOpenid: function (callback) {
    //用云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        this.setData({
          openid: res.result.openid
        })
        callback();
      }
    })
  },
  getData:function(){
    const { collection, openid } = this.data;
    const db = wx.cloud.database();

    db.collection(collection).where({
      _openid: openid
    }).get({
      success: res => {
        console.log(res)
        this.setData({
          list: res.data
        })
      }
    })
  },
  onLoad: function (options) {
    this.getOpenid(this.getData);
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