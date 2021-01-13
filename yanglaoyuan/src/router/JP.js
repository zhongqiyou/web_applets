import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/jpTable',
    name: 'leo',
    // 是否是左侧导航栏
    leftNav: false,
    // 是否需要登录
    needLogin: false,
    component: () => import('../views/jpTable.vue')
  },
  {
    path: '/singalDetail',
    name: '老人详情',
    tabName:'routerTab.details',
    leftNav: false,
    needLogin: false,
    component: () => import('../views/singalDetail.vue')
  },
  {
    path: '/oldManMsg',
    name: '老人基本信息',
    tabName:'routerTab.information',
    leftNav: false,
    needLogin: false,
    component: () => import('../views/oldManMsg.vue')
  },
  {
    path: '/changeClothes',
    name: '更衣行程表',
    tabName:'singalDetail.scheduleDressing',
    leftNav: false,
    needLogin: false,
    component: () => import('../views/changeClothes.vue')
  },
  {
    path: '/serviceMetting',
    name: '服务负责人会议的要点',
    tabName:'serviceMetting.title',
    leftNav: false,
    needLogin: false,
    component: () => import('../views/serviceMetting.vue')
  },
  {
    path: '/facilities',
    name: '设施一览表',
    tabName:'singalDetail.facilities',
    leftNav: false,
    needLogin: false,
    component: () => import('../views/facilities.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
