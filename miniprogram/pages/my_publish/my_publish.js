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
  toDetails:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id
    })
  },
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
        let newres = res.data.reverse();
        this.setData({
          list: newres
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
    this.getData();
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