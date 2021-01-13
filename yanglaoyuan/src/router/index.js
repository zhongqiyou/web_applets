import Vue from 'vue'
import VueRouter from 'vue-router'
import MedicalTable from "@/views/MedicalTable"
// import Home from '../views/Home.vue'
import jp from './JP.js';
import zj from './ZJ.js';
import fj from './FJ.js';


Vue.use(VueRouter)

const OldProfile = ()=>import('../views/OldProfile.vue')

const routes = [
  {path: '/index',name:'首页',tabName:'routerTab.index',leftNav: true,needLogin: false,component:() => import('../views/index.vue')},
  {path: '/OldProfile',name:'老人档案管理',tabName:'routerTab.archives',leftNav: true,needLogin: false,component:OldProfile},
  {path: '/MedicalTable', name: '病历表', tabName:'routerTab.medical',leftNav: false, needLogin: false, component:MedicalTable},
  // {
  //   path: '/basicInformation',
  //   name: '设施基本信息',
  //   // 是否是左侧导航栏
  //   leftNav: true,
  //   needLogin: false,
  //   component: () => import('../views/basicInformation.vue')
  // },
  // {
  //   path: '/employeeFile',
  //   name: '职员档案',
  //   leftNav: true,
  //   needLogin: false,
  //   component: () => import('../views/employeeFile.vue')
  // },
  // {
  //   path: '/fileManagement',
  //   name: '老人档案管理',
  //   leftNav: true,
  //   needLogin: false,
  //   component: () => import('../views/fileManagement.vue')
  // },
  {path:'',redirect:'/index'}
]

const jpRoutes = jp.options.routes;
const zjRoutes = zj.options.routes;
const fjRoutes = fj.options.routes;

for (let i in jpRoutes) {
  routes.push(jpRoutes[i]);
}
for (let i in zjRoutes) {
  routes.push(zjRoutes[i]);
}
for (let i in fjRoutes) {
  routes.push(fjRoutes[i]);
}
// console.log(routes);

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("token")) {
    if (to.path !== '/login') {
      return next('/login')
    }
  }
  next()
})

export default router
