const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:Boolean,
    chooseClass:'choose',
    unChooseClass:'unchoose',
    userInfo:null,
    userIcon:'',
    userName:'',
    collection:'list'
  },
  chooseGet:function(){
    this.setData({
      choose:true,
    })
  },
  chooseLoss: function () {
    this.setData({
      choose: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getAuth:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userIcon: app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName
      })
    }
    else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.setData({
                  userInfo: res.userInfo,
                  userIcon: res.userInfo.avatarUrl,
                  userName: res.userInfo.nickName
                })
              }
            })
          }
        }
      })
    }
  },
  getDate:function(){
    //获取时间拼成数字
    let date=new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if(10 - month > 0){
      month='0'+month
    }
    if (10 - day > 0) {
      day='0'+day
    }
    let num = year.toString() + month.toString() + day.toString();
    num = parseInt(num);
    return num;
  },
  sendConfirm:function(){
    this.collectionAdd();
    //上传后返回页面
    wx.navigateBack({
    })
  },
  getOpenid: function () {
    //用云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        app.globalData.openid = res.result.openid;
      }
    })
  },
  collectionAdd: function(){
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      duration: 2000
    })
    const { collection } = this.data;
    const db = wx.cloud.database();
    
    let date = this.getDate();
    let data = {
      openid: app.globalData.openid,
      date: date,
      title: '',
      content: '',
      icon:''
    };
    // 用回调函数解决异步问题，通过判断各个值是否为空来判断所有异步是否完成
    let title = f((res) => {
      if (res.date != '' && res.openid != '' && res.title != '' && res.content != '')
      db.collection(collection).add({
        data: {
          openid:res.openid,
          date:res.date,
          title:res.title,
          content:res.content
        },
        success: res => {
          console.log(res)
        },
        fail: res => {
          console.log('fail')
        }
      })
    });
    function f(callback){
      //用selectquery来获取页面元素
      let sq = wx.createSelectorQuery();
      sq.select(".bot_text_title").fields({
        properties: ['value']
      }, res => {
        data.title=res.value
        callback(data)
      }).exec();
      sq.select(".bot_text_area").fields({
        properties: ['value']
      }, res => {
        data.content = res.value
        callback(data)
      }).exec();
    }
  },
  
  onLoad: function (options) {
    this.getOpenid();
    this.getAuth();
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

  },
  async try(fn, title) {
    try {
      await fn()
    } catch (e) {

    }
  }
})