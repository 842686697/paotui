
Page({
  data: {
    list:[],
    collection:'list',
    groupId:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getData:function(){
    const { collection } = this.data;
    const db = wx.cloud.database();
    const _ = db.command;
    const listData = db.collection(collection).where({}).get({
      success: res => {
        console.log(res);
        this.setData({
          list: res.data
        })
      }
    })
  },
  onLoad: function (options) {
    this.getData();
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
    this.getData();
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