import router from './router'
// import { Message } from 'element-ui'
// import axios from 'axios'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法


import Layout from '@/views/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入

import { getMenuList } from '@/api/login'

var getRouter //用来获取后台拿到的路由

// 假装fakeRouter是通过后台接口请求回来的数据
let fakeRouter = {
  "router": [
    /*{
      "path": "*",
      "redirect": "/404",
      "hidden": true
    }*/
  ]

}

router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem('TOKEN')
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!getRouter) {
        if (!getObjArr('router')) {
          return new Promise((resolve, reject) => {
            return getMenuList().then(res => {
              if (res.status !== 200) {
                alert(`菜单获取失败！具体失败原因：${res.message}`)
              }
              getRouter = res.data
              getRouter = [...router,...getRouter]
              saveObjArr('router', getRouter)
              routerGo(to, next)
              resolve()
            }).catch(err => {
              console.log(err, '---------------error')
              reject(err)
            })
          })
        } else {
          getRouter = getObjArr('router')
          console.log(getRouter)
          routerGo(to, next)
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})


function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));

}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
