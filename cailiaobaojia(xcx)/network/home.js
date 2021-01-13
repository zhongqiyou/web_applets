import axios from "./network";


//   发送登录
function sendLogin(data){  
 let url = "/wechatApi/login";
  if(data.id){
    url = "/wechatApi/testLogin"
  }
  return axios({
    url:url,
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