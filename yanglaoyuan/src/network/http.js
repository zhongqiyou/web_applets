import axios from 'axios'
import router from 'vue-router'
// const BASE_URL = '/api'
const BASE_URL = 'http://47.115.137.147:9000/'
localStorage.setItem('baseUrl',BASE_URL);
const token = localStorage.getItem('token')
const language = 'en_US'
import {Spin} from 'view-design'

const example = axios.create({
  baseURL: BASE_URL,
  timeout: 500000,
  responseType: 'json',
  withCredentials: false
})

//      请求拦截     //
example.interceptors.request.use(config => {
  // Spin.show()
  config.headers['Authorization'] = localStorage.getItem('token') || ''
  // if(config.method === 'post' || config.method === 'put'){
  //   config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8"
  // }
  config.headers['lang'] = language
  return config;
},err => {
  return Promise.reject(err)
})


//      响应拦截     //
example.interceptors.response.use(res => {
  Spin.hide()
  console.log(res.data)
  return res.data
},err => {
  Spin.hide()
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求:'+err.response.status)
        break;
      case 401:
        console.log('未授权，请重新登录:'+err.response.status)
        break;
      case 403:
        console.log('拒绝访问:'+err.response.status)
        break;
      case 404:
        console.log('请求错误,未找到该资源:'+err.response.status)
        break;
      case 408:
        console.log('请求超时:'+err.response.status)
        break;
      case 500:
        console.log('服务器端出错:'+err.response.status)
        break;
      default:
        console.log(`连接错误:${err.response.status}`)
    }
  } else {
    console.log('连接到服务器失败:'+err.response.status)
  }
})


/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    example({
      url,
      params,
      method: 'get',
      ...config
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
  console.log(config)
  return new Promise((resolve, reject) => {
    example({
      url,
      data,
      method: 'post',
      ...config
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 统一封装post请求  */
export const put = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    example({
      url,
      data,
      method: 'put',
      ...config
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export{
  BASE_URL
}
