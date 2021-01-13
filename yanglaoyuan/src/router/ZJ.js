import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = ()=>import('../views/login.vue')
const error = ()=>import('../views/error.vue')
const DrainTrip = ()=>import('../views/DrainTrip.vue')
const DrainExtend = ()=>import('../views/DrainExtend.vue')
const ServePlan = ()=>import('../views/ServePlan.vue')
const VoteMeeting = ()=>import('../views/VoteMeeting.vue')
const EntryTable = ()=>import('../views/EntryTable.vue')
const WashTime = ()=>import('../views/WashTime.vue')
const ConingTrip = ()=>import('../views/ConingTrip.vue')
const BedsoreAssess = ()=>import('../views/BedsoreAssess.vue')
const FacilitiesPlan = ()=>import('../views/FacilitiesPlan.vue')
const FacilitiesPlan1 = ()=>import('../views/FacilitiesPlan1.vue')
const FacilitiesPlan2 = ()=>import('../views/FacilitiesPlan2.vue')
const FacilitiesPlan3 = ()=>import('../views/FacilitiesPlan3.vue')
const FoodTime = ()=>import('../views/FoodTime.vue')
const CarePlan = ()=>import('../views/CarePlan.vue')
const NurseServe = ()=>import('../views/NurseServeMeet.vue')
const Record = ()=>import('../views/Record.vue')
const monitorItem = ()=>import('../views/monitorItem.vue')
const BathExchange = ()=>import('../views/BathExchange.vue')

const routes = [
  {path: '/login',name:'登录',tabName:'routerTab.login',leftNav: false,needLogin: false,component:login},
  {path: '/error',name:'出错',tabName:'routerTab.error',leftNav: false,needLogin: false,component:error},
  {path: '/DrainTrip',name:'排泄行程表',tabName:'singalDetail.scheduleExcretion',leftNav: false,needLogin: false,component:DrainTrip},
  {path: '/DrainExtend',name:'排泄括入力',tabName:'routerTab.force',leftNav: false,needLogin: false,component:DrainExtend},
  {path: '/ServePlan',name:'一周服务计划书',tabName:'ServePlan.title',leftNav: false,needLogin: false,component:ServePlan},
  {path: '/VoteMeeting',name:'入所判定会议记录',tabName:'routerTab.minutes',leftNav: false,needLogin: false,component:VoteMeeting},
  {path: '/EntryTable',name:'入所一览表',tabName:'routerTab.entryList',leftNav: false,needLogin: false,component:EntryTable},
  {path: '/WashTime',name:'入浴行程表',tabName:'singalDetail.scheduleBath',leftNav: false,needLogin: false,component:WashTime},
  {path: '/ConingTrip',name:'整容行程表',tabName:'singalDetail.scheduleFacelift',leftNav: false,needLogin: false,component:ConingTrip},
  {path: '/BedsoreAssess',name:'褥疮对策评价表',tabName:'routerTab.evaluation',leftNav: false,needLogin: false,component:BedsoreAssess},
  {path: '/FacilitiesPlan',name:'设施服务计划书',tabName:'routerTab.prospectus',leftNav: false,needLogin: false,component:FacilitiesPlan},
  {path: '/FacilitiesPlan1',name:'设施服务计划书(2-1)',tabName:'routerTab.prospectus1',leftNav: false,needLogin: false,component:FacilitiesPlan1},
  {path: '/FacilitiesPlan2',name:'设施服务计划书(2-2)',tabName:'routerTab.prospectus2',leftNav: false,needLogin: false,component:FacilitiesPlan2},
  {path: '/FacilitiesPlan3',name:'设施服务计划书(2-3)',tabName:'routerTab.prospectus3',leftNav: false,needLogin: false,component:FacilitiesPlan3},
  {path: '/FoodTime',name:'饮食行程表',tabName:'singalDetail.scheduleEating',leftNav: false,needLogin: false,component:FoodTime},
  {path: '/CarePlan',name:'褥疮对策的评价和护理计划',tabName:'routerTab.nursingPlan',leftNav: false,needLogin: false,component:CarePlan},
  {path: '/NurseServe',name:'护理服务人员会议的要点',tabName:'routerTab.pointsKey',leftNav: false,needLogin: false,component:NurseServe},
  {path: '/Record',name:'经过表',tabName:'singalDetail.after',leftNav: false,needLogin: false,component:Record},
  {path: '/monitorItem',name:'监控方式',tabName:'singalDetail.monitorWay',leftNav: false,needLogin: false,component:monitorItem},
  {path: '/BathExchange',name:'入浴交换表',tabName:'singalDetail.BathExchange',leftNav: false,needLogin: false,component:BathExchange}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
