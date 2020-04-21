// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],
    collection:'message',
    openid:'',
    isHost:Boolean
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toChat:function(e){
    wx.navigateTo({
      url: '/pages/chat/chat?id='+e.currentTarget.dataset.id
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
    const {collection}=this.data;
    const openid=this.data.openid;
    const db=wx.cloud.database();
    const _=db.command;
    console.log(openid);
    db.collection(collection).where(_.or([
      {information:{
        _openids:{
          host: openid
        }
      }},
      {information: {
        _openids: {
          visitor: openid
        }
      }}
    ])).get({
      success:res=>{
        console.log(res);
        this.setData({
          message:res.data
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
    this.getData()
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