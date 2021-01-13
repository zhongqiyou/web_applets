import axios from "./network";


//   发送登录
function sendLogin(data){
  return axios({
    url:'/wechatApi/login',
    data
  })
}

//   项目方注册
function sendProjectLogon(data){
  return axios({
    url:"/wechatApiToken/projectRegistration",
    data
  })
}
//   内部人员注册
function sendInsiderLogon(data){
  return axios({
    url:"/wechatApiToken/insideRegistration",
    data
  })
}

export{
  sendLogin,
  sendProjectLogon,
  sendInsiderLogon
}