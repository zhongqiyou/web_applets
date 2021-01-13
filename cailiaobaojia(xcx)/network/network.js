const BASE_URL = "https://offer.gdweihu.com/api"; //接口资源(线上)
const IMG_URL = "https://offer.gdweihu.com/storage";//图片资源(线上)
// const BASE_URL = "http://princesssnow.com/api"; //接口资源(线下)
// const IMG_URL = "http://princesssnow.com/storage";//图片资源(线下)

const token = wx.getStorageSync('token');
const license = wx.getStorageSync('weixinUser');
import {toast} from '../utils/Tools'
const app = getApp()

export default params => {
  const routeLen = getCurrentPages().length-1
  const {route} =  getCurrentPages()[routeLen]
  //  判断有没有授权 并且 当前页面是不是首页  
  if(!wx.getStorageSync('weixinUser') && route !== 'pages/other/warrant/warrant'){
    toast('您还未授权,请先授权')
    wx.reLaunch({
      url: '/pages/other/warrant/warrant'
    });
    return;
  }
  // if(!wx.getStorageSync('token') && route !== 'pages/index/index'){
  //   toast('您还未登录,请先登录')
  //   wx.reLaunch({
  //     url: '/pages/other/login/login'
  //   });
  // }

  let contentType;
  return new Promise((resolve, reject) => {
    //   如果method是小写,把method转为大写后判断
    wx.showLoading({title: "正在加载中..."})
    let way = params.method
    if(params.method) way = params.method.toUpperCase()
    if (way === 'POST') {
      contentType = 'application/x-www-form-urlencoded';
    } else {
      contentType = 'application/json' 
    }
    // let data = {}
    // token ? data = Object.assign({},params.data,{token}) : data = params.data
    // const login_status =  wx.getStorageSync('login_status') || 'supplier';
      wx.request({
        url: BASE_URL + params.url,
        data:params.data,
        timeout:80000,
        method: params.method || "POST",
        header:{
          'content-type': contentType,
          'Authorization':'Bearer ' + wx.getStorageSync("token") || ''
        },
        success:res => {          
          if (res.data) { 
            /** start 根据需求 接口的返回状态码进行处理 */
            if (res.statusCode === 200) {
              if(res.data.status === 200){
                console.log(res.data)
                resolve(res.data)
              }else if(res.data.status === 401){
                toast(res.data.message)
                setTimeout(()=>{
                  wx.reLaunch({
                    url: '/pages/other/warrant/warrant'
                  });
                },1500)
                return;
              }else{
                if(res.data.length > 0){
                  toast(res.data.data.message[0])
                }else{
                  toast(res.data.message)
                }
                
              }
            } else {
              reject(res.data.message); //request failed
            }
            /** end 处理结束*/
          }
        },
        fail: error => {
          reject(error)
        }
      })
      wx.hideLoading();
  })
}

export {
  BASE_URL ,
  IMG_URL
}