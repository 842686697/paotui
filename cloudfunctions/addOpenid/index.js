// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let host=event.host;
  let hostIcon=event.hostIcon;
  let hostName=event.hostName;
  let visitor=event.visitor;
  let visitorIcon= event.visitorIcon;
  let visitorName= event.visitorName;
  let listId=event.listId;
  try{
    return await db.collection('message').add({
      data: {
        _openid: [event.host, event.visitor],
        information: {
          listId: listId,
          _openids: {
            host: host,
            hostIcon: hostIcon,
            hostName: hostName,
            visitor: visitor,
            visitorIcon: visitorIcon,
            visitorName: visitorName
          },
          unread: 0
        },
        messages: []
      },
      success:res=>{
        console.log('成功'+res)
      },
      fail:res=>{
        console.log('失败'+res)
      },
      complete:res=>{
        console.log('调用成功'+res)
      }
    })
  }catch(e){
    console.log(e)
  }

}