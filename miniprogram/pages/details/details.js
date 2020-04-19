// miniprogram/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    collection:'list',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  setFinish:function(){
    wx.showModal({
      title: '提示',
      content: '确认设置为已完成吗？',
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#FF0000',
      success:res=>{
        if(res.confirm==true){
          const { collection } = this.data;
          const id = this.data.list._id;
          console.log(id);
          const db = wx.cloud.database();
          db.collection(collection).where({
            _id: id
          }).update({
            data:{
              isFinish:true
            },
            success: res => {
              this.getData();
            }
          })
        }else{
          console.log(res)
        }
      }

    })

  },
  dataDelete:function(){
    wx.showModal({
      title: '提示',
      content: '确认要删除吗？',
      cancelText:'取消',
      cancelColor:'#000000',
      confirmText:'确定',
      confirmColor:'#FF0000',
      success:res=>{
        const {collection}=this.data;
        const id=this.data.list._id;
        console.log(id,collection)
        if(res.confirm==true){
          const db=wx.cloud.database();
          db.collection(collection).where({
            _id:id
          }).remove({
            success:res=>{
              console.log(res);
            }
          })
        }else{

        }
      },
      fail:res=>{
        console.log(res)
      }
    })
  },
  getData: function () {
    const {collection} = this.data;
    const id=this.data.id;
    const db = wx.cloud.database();

    db.collection(collection).where({
      _id: id
    }).get({
      success: res => {

        this.setData({
          list: res.data[0]
        })

      }
    })
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    console.log(this.data.id);
    this.getData()
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