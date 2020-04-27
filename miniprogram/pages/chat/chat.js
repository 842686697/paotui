const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    collection:'message',
    id:'',
    openid:'',
    watcher:null,
    icon:'',
    name:'',
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  clearUnread:function(){
    //确认unread对方
    const { collection, id, openid } = this.data;
    const db = wx.cloud.database();
    let unread = '';
    if (openid == this.data.list.information._openids.host) {
      unread = 'visitorUnread'
    } else {
      unread = 'hostUnread'
    }
    //修改数据未读为0
    db.collection(collection).where({
      _id: id
    }).update({
      data: {
        information: {
          _openids: {
            [unread]: 0
          }
        }
      }
    })
  },
  getDate: function () {
    //获取时间拼成数字
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (10 - month > 0) {
      month = '0' + month
    }
    if (10 - day > 0) {
      day = '0' + day
    }
    let num = year.toString() + '/' + month.toString() + '/' + day.toString();
    return num;
  },
  getTime: function () {
    //获取时间拼成数字
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    if (10 - hours > 0) {
      hours = '0' + hours
    }
    if (10 - mins > 0) {
      mins = '0' + mins
    }
    let time = hours.toString() + ':' + mins.toString();
    return time;
  },
  // addData:function(newMessage){
  //   let messages=this.data.list.messages;
  //   messages.push(newMessage);
  //   console.log(messages);
  //   return messages
  // },
  sendConfirm:function(){
    let sq = wx.createSelectorQuery();
    sq.select(".message_area").fields({
      properties: ['value']
    }, res => {
      const db = wx.cloud.database();
      const _=db.command;
      const { collection, openid, icon, name ,id } = this.data;
      let unread='';
      //确认unread添加的一方
      if(openid==this.data.list.information._openids.host){
        unread='hostUnread'
      }else{
        unread = 'visitorUnread'
      }
      let date=this.getDate();
      let time=this.getTime();
      let content=res.value;
      //通过commond操作符来添加数据，update试过，云函数也试过但没起效,后面察觉是没有插入openid所以没有修改权限
      db.collection(collection).where({
        _id:id
      }).update({
        data:{
          information:{
            _openids:{
              [unread]:_.inc(1)
            }
          },
          messages: _.push({
            _openid: openid,
            date: date,
            hasRead: false,
            icon: icon,
            message: content,
            name: name,
            time: time
          })
        }
      })
    }).exec();
    //输入框
    this.setData({
      value: ''
    })
    this.pageScrollToBottom()
  },
  // 使页面滚动到底部
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('.box').boundingClientRect(res=>{
      if (res!=null){
        let len = this.data.list.messages.length
        wx.pageScrollTo({
          scrollTop: res.height * len
        }) 
      }
    }).exec()
  },
  getWatcher:function(){
    const {collection,id}=this.data;
    const db=wx.cloud.database();
    const watcher=
    this.setData({
      watcher: db.collection(collection).where({
        _id:id
      }).watch({
        onChange: snapshot=>{
          this.getData(this.pageScrollToBottom,this.clearUnread);
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
  getAuth: function () {
    if (app.globalData.userInfo) {
      this.setData({
        icon: app.globalData.userInfo.avatarUrl,
        name: app.globalData.userInfo.nickName
      })
    }
    else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.setData({
                  icon: res.userInfo.avatarUrl,
                  name: res.userInfo.nickName
                })
              }
            })
          }
        }
      })
    }
  },
  getData:function(callback1,callback2){
    const {collection,id,openid}=this.data;
    const db=wx.cloud.database();
    //获取数据
    db.collection(collection).where({
      _id:id
    }).get({
      success:res=>{
        console.log(res);
        
        this.setData({
          list:res.data[0]
        })
        callback2();
        callback1();
      }
    })

  },
  onLoad: function (options) {
    this.getAuth()
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