const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],
    collection:'message',
    openid:'',
    isHost:Boolean,
    hasLogin:false,
    watcher:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  hasLogin:function(){
    if (app.globalData.userInfo){
      this.setData({
        hasLogin:true
      })
    }else{
      this.setData({
        hasLogin: false
      })
    }
  },
  chatDelete:function(e){
    wx.showModal({
      title: '提示',
      content: '确认删除会话吗，双方的会话框都会被删除',
      success:res=>{
        if(res.confirm==true){
          const db = wx.cloud.database();
          const { collection } = this.data;
          let id = e.currentTarget.dataset.id;
          console.log('id', id)
          db.collection(collection).doc(id).remove({
            success: res => {
              console.log('delete:', res)
              this.getData()
            }
          })
        }
      }
    })
  },
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
  getWatcher:function(){
    const { collection } = this.data;
    const openid = this.data.openid;
    const db = wx.cloud.database();
    const _ = db.command;
    this.setData({
      watcher: db.collection(collection).where(_.or([
        {
          information: {
            _openids: {
              host: openid
            }
          }
        },
        {
          information: {
            _openids: {
              visitor: openid
            }
          }
        }
      ])).watch({
        onChange: res => {
          console.log('监听开始');
          this.getData()
        },
        onError: res => {
          console.log('监听报错')
        }
      })
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
        //确认获得的数据与app判断是否显示数据
        this.hasLogin()
      }
    })
  },
  onLoad: function (options) {
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
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.watcher.close()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.data.watcher.close()
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