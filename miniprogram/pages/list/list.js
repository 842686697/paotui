const app=getApp();
Page({
  data: {
    list:[],
    collection:'list',
    groupId:'',
    resizeIndex:-1,
    unLoginIcon:'/images/unloginIcon.png',
    listUnSelectStyle:'list_box',
    listSelectStyle:'list_resizeBox',
    regExp:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  search:function(e){
    let reg;
    if(e.detail.value==''){
      reg=''
    }
    else{
      reg = '^.*' + e.detail.value + '.*$';
    }
    console.log(reg,typeof(reg))
    this.setData({
      regExp:reg
    })
    this.getData()
  },
  viewImgs:function(e){
    let getList=this.data.list.filter(res=>{
      return res._id == e.target.dataset.id
    })
    console.log(getList[0])
    wx.previewImage({
      current: getList[0].imgId[e.target.dataset.index],
      urls: getList[0].imgId,
      success: res => {
        console.log('成功',res);
      },
      fail:res=>{
        console.log('失败',res)
      }
    })
  },
  getData:function(){
    //获取数据
    const { collection,regExp } = this.data;
    const db = wx.cloud.database();
    const _ = db.command;//暂时无用

    if (regExp!=''){//如果没有搜索就普通拉取数据
      const listData = db.collection(collection).where({
        title: db.RegExp({
          regexp: regExp,
          options: 'i'
        })
      }).get({
        success: res => {
          console.log(res);
          this.setData({
            list: res.data
          })

        }
      })
    }
    else{//否则用正则表达式搜索需要的相关数据
      const listData = db.collection(collection).where({}).get({
        success: res => {
          console.log(res);
          this.setData({
            list: res.data
          })

        }
      })
    }
  },
  //用来锁定聚焦放大的信息窗口
  resize:function(e){
    if (this.data.resizeIndex == e.currentTarget.dataset.index){
      this.setData({
        resizeIndex: -1
      })
    }
    else{
      this.setData({
        resizeIndex: e.currentTarget.dataset.index
      })
    }
  },
  toPublish:function(){
    wx.navigateTo({
      url: '/pages/publish/publish',
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
  //上传成功返回页面时刷新页面
  onShow: function () {
    setTimeout(this.getData,300);
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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1000);
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