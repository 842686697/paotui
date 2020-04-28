const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose:false,
    chooseClass:'choose',
    unChooseClass:'unchoose',
    userInfo:null,
    userIcon:'',
    userName:'',
    collection:'list',
    imgs:[],
    imgId:[],
    tags:'拾'
  },
  chooseChange:function(){
    if(this.data.choose){
      this.setData({
        choose: false,
        tags:'丢'
      })
    }else{
      this.setData({
        choose: true,
        tags: '拾'
      })
    }
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
    let num = year.toString() + '/' + month.toString() + '/' + day.toString();
    return num;
  },
  sendConfirm:function(){
    wx.showLoading({
      title: '提交中...',
    })

    this.uploadFile(
      this.collectionAdd,function(){
        //上传后再返回页面,不然获取不到页面元素数据
        wx.navigateBack({
        })
        wx.hideLoading();
      }
    );

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
  collectionAdd: function(back){
    const { collection } = this.data;
    const db = wx.cloud.database();
    
    let date = this.getDate();
    let type = this.data.choose
    console.log('开始上传')
    let data = {
      date: date,
      title: '',
      content: '',
      icon:this.data.userIcon,
      userName:this.data.userName,
      isFinish:false,
      type:type?'get':'loss',
      imgId:this.data.imgId
    };
    // 用回调函数解决异步问题，通过判断各个值是否为空来判断所有异步是否完成
    f((res) => {
      if (res.date != ''  && res.title != '' && res.content != ''&& res.icon != '')
      db.collection(collection).add({
        data: data,
        success: res => {
          console.log(res)
          back();
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
  //上传临时图片文件到imgs临时文件
  upload:function(){
    wx.chooseImage({
      count:2,
      success: res=>{
        this.setData({
          imgs:res.tempFilePaths
        })
      },
      fail:res=>{
        console.log('调用图片失败:',res)
      }
    })
  },
  //将临时文件储存到云端
  uploadFile:function(callback,back){
    if(this.data.imgs.length==0){
      callback(back);
    }
    else{
      for (let i = 0; i < this.data.imgs.length; i++) {
        wx.cloud.uploadFile({
          cloudPath: 'listImgs/' + new Date().getTime() + '_' + i + '.png',
          filePath: this.data.imgs[i],
          success: res => {
            let fileId = this.data.imgId;
            fileId.push(res.fileID);
            this.setData({
              imgId: fileId
            })
            console.log('成功', res, this.data.imgId);

            if (this.data.imgId.length >= this.data.imgs.length) {
              callback(back);
            }
          },
          fail: res => {
            console.log('失败', res);
          }
        })
      }
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
})