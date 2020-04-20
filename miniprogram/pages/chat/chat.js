// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    collection:'message',
    id:'',
    openid:'',
    watcher:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sendConfirm:function(){
    
  },
  getWatcher:function(){
    const {collection,id}=this.data;
    const db=wx.cloud.database();
    this.setData({
      watcher: db.collection(collection).where({
        _id:id
      }).watch({
        onChange: snapshot=>{
          this.getData();
          console.log('docs\'s changed events', snapshot.docChanges)
          console.log('query result snapshot after the event', snapshot.docs)
          console.log('is init data', snapshot.type === 'init')
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })
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
    const {collection,id}=this.data;
    const db=wx.cloud.database();
    db.collection(collection).where({
      _id:id
    }).get({
      success:res=>{
        console.log(res);
        this.setData({
          list:res.data[0]
        })
        console.log(this.data.list)
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getOpenid(this.getWatcher);
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