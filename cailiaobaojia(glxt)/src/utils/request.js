import axios from 'axios'
const BASE_URL = process.env.VUE_API_URL
// const BASE_URL = 'https://offer.gdweihu.com/api/'
// const BASE_URL = 'http://princesssnow.com/api/'
localStorage.setItem('baseUrl',BASE_URL);
import storage from '@/utils/storage'
// const language = 'en_US'
import { Message, Loading } from 'element-ui';

let loading
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

//      请求拦截     //
service.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('TOKEN') || ''
  /*if(config.method === 'post' || config.method === 'put'){
    config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8"
  }*/
  showFullScreenLoading()
  return config;
},err => {
  tryHideFullScreenLoading()
  return Promise.reject(err)
})

//      响应拦截     //
service.interceptors.response.use(res => {
  tryHideFullScreenLoading()
  return res.data
},err => {
    console.log('连接到服务器失败:'+err.response.status)
  tryHideFullScreenLoading()
  if (err.response.status === 401) {
    storage.remove('TOKEN')
    Message({
      type: 'error',
      message: '登陆已经失效！请重新登陆！'
    })
    setTimeout(() => {
      this.$router.go(0);
    }, 3000)
  } else {
    Message({
      type: 'error',
      message: '未知错误！请刷新下页面再试！或者联系相关技术人员！'
    })
  }
})

export default service
