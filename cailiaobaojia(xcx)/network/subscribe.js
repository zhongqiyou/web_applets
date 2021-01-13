import axios from './network';

// 
function subscribeMessageSend(data){
  return axios({
    url:'/wechatApi/subscribeMessageSend' ,
    data
  })
}


export{
  subscribeMessageSend
}