import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

var constantRouterMap=[
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export default new Router({
  routes: constantRouterMap

})
