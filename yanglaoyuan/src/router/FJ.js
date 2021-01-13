import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {path: '/worksheet',name:'24小时工作表',tabName:'worksheet.title',leftNav: false,needLogin: false,component:() => import('../views/worksheet.vue')},
  {path: '/JixuVoteMeeting',name:'继续录取判断会议纪要',tabName:'JixuVoteMeeting.title',leftNav: false,needLogin: false,component:() => import('../views/JixuVoteMeeting.vue')},
  {path: '/afterRecord',name:'经过记录',tabName:'afterRecord.title',leftNav: false,needLogin: false,component:() => import('../views/afterRecord.vue')},
  {path: '/monitorCare',name:'监测看护',tabName:'routerTab.monitoring',leftNav: false,needLogin: false,component:() => import('../views/monitorCare.vue')},
  {path: '/monitor',name:'监控',tabName:'routerTab.monitor',leftNav: false,needLogin: false,component:() => import('../views/monitor.vue')},
  {path: '/monitorRegular',name:'监控方式',tabName:'nurseServe.table.monitoringMethod',leftNav: false,needLogin: false,component:() => import('../views/monitorRegular.vue')},
  {path: '/monitorEntry',name:'监控方式(入所)',tabName:'routerTab.entry',leftNav: false,needLogin: false,component:() => import('../views/monitorEntry.vue')},
  {path: '/excretion',name:'排泄一拓入力表',tabName:'excretion.Excretion',leftNav: false,needLogin: false,component:() => import('../views/excretion.vue')},
  {path: '/dailySchedule',name:'每日课程表',tabName:'dailySchedule.title',leftNav: false,needLogin: false,component:() => import('../views/dailySchedule.vue')},
  {path: '/evaluate',name:'影响评价',tabName:'singalDetail.assessment',leftNav: false,needLogin: false,component:() => import('../views/evaluate.vue')},
  {path: '/onDuty',name:'出勤人员',tabName:'onDuty.title',leftNav: false,needLogin: false,component:() => import('../views/onDuty.vue')},
  {path: '/meal',name:'食事一括入力表',tabName:'meal.title',leftNav: false,needLogin: false,component:() => import('../views/meal.vue')},
  {path: '/sores',name:'压疮控制的评估和护理计划',tabName:'singalDetail.mobileTrauma',leftNav: false,needLogin: false,component:() => import('../views/sores.vue')},
  {path: '/new',name:'新',tabName:'singalDetail.after',leftNav: false,needLogin: false,component:() => import('../views/new.vue')},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
