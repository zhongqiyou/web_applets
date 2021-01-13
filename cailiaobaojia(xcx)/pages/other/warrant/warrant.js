const { sendLogin } = require("../../../network/home");
const { toast } = require("../../../utils/Tools");
const app = getApp()
Page({
  data:{
    code: '',
    info:{},
    idUrl: app.globalData.idUrl ,
    title:"" 
  },
  onShow(){
    wx.removeStorageSync('token');
    const weixinUser = wx.getStorageSync('weixinUser')
    if(weixinUser){
      this.setData({
        info: wx.getStorageSync('weixinUser'),
        idUrl: app.globalData.idUrl
      })
    }
    this.handleGetCode()
  },
  onLoad(e){    
         if(e.title){
          wx.showModal({
            title: '提示',
            content: '正在审核中...',
            showCancel:false 
          })
        }    
  } ,
  ///     函数事件 / ///
  handleGetCode(){  //   获得code
    wx.login({
      timeout:100000,
      success: (res)=>{
        this.setData({
          code: res.code
        })
      }
    });
  },
  handleGetUser(e){  //   微信授权
    wx.setStorageSync('weixinUser', e.detail);
    this.setData({
      info: e.detail
    })
    const data = {
      code: this.data.code,
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData , 
      id:114
    }
    this._sendLogin(data , 1)
    
  }, 




  ///  网络请求
  _sendLogin(data){    
    sendLogin(data).then(res=>{
          if(res.status === 200){
        console.log(res.data.token,'res.data.token');
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('user', res.data);
        if(res.data.audit == 2 || res.data.identity ==0){  
            if(res.data.identity == 0 || res.data.identity == 1){
              wx.reLaunch({
                url: this.data.idUrl[res.data.identity]
              })  
            }else{
              wx.reLaunch({
                url: this.data.idUrl[parseInt(res.data.identity) + parseInt(res.data.admin)]
              })  
            }

        }else{
          toast('审核未通过或者正在审核')
        }
      }
    })
    this.handleGetCode()
  }
})