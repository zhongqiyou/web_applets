import {get,post,put} from './http'

//   登录
function sendLogin(data){
  return get('/app/login/login',data)
}

//   删除周计划
function delWeekPlan(data){
  return get('/app/plan/delete',data)
}

//   获取周计划表
function getWeekPlan(data){
  return get('/app/plan/getById',data)
}

//   提交一周服务计划书
function sendWeekPlan(data){
  return post('/app/plan/save',data)
}

//   提交如果是判定会议记录
function sendVoteMeet(data){
  return post('/app/determining/save',data)
}

//   获得判定会议记录
function getVoteMeet(data){
  return get('/app/determining/getById',data)
}

//    获得首页老人列表
function getOldmanLis(data){
  return get('/app/home/listOldMan',data)
}

///   获取单元
function getUnit(data){
  return get('/app/beds/getUnitByNursingId',data)
}

////    通过单元获取老人列表
function getOldByUnit(data){
  return get('/app/dailyRoutine/getByUnitId',data)
}


//    获得每日课程表
function getDailyTable(data){
  return get('/app/dailyRoutine/getById',data)
}

//    获得每日课程表-病历表
function getDailyCase(data){
  return get('/app/dailyRoutine/getCaseById',data)
}

//    获得每日课程表-重点表
function getDailyPoint(data){
  return get('/app/dailyRoutine/getPointById',data)
}

//     获得每日课程表 - 获取表
function getDailyGain(data){
  return get('/app/dailyRoutine/getGainById',data)
}

//     提交每日课程表
function sendDailyTable(data){
  return post('/app/dailyRoutine/save',data)
}

//     提交每日课程表 - 病历表
function sendDailyCase(data){
  return post('/app/dailyRoutine/saveCase',data)
}

//     提交每日课程表 - 重点表
function sendDailyPoint(data){
  return post('/app/dailyRoutine/savePoint',data)
}

//     提交每日课程表 - 获取表
function sendDailyGain(data){
  return post('/app/dailyRoutine/saveGain',data)
}

//     查询通知列表
function getNoticeList(data){
  return get('/app/notification/list',data)
}

//      删除通知
function delNotice(data){
  return get('/app/notification/delete',data)
}

//      新增通知
function addNotice(data){
  return post('/app/notification/save',data)
}

//      修改通知
function changeNotice(data){
  return put('/app/notification/update',data)
}

//      根据老人id查询监控方式
function getMonitor(data){
  return get('/app/monitor/getMonitor',data)
}

//      根据监控方式id查询执行周期（期间）
function getExecutionCycles(data){
  return get('/app/monitor/getExecutionCycles',data)
}

//       新增执行期间
function sendExecutionCycle(data){
  return post('/app/monitor/saveExecutionCycle',data)
}

//      新增监控方式
function sendMonitor(data){
  return post('/app/monitor/saveMonitor',data)
}

//       修改执行期间
function changeExecutionCycle(data){
  return post('/app/monitor/updateExecutionCycle',data)
}

//        修改监控方式
function changeMonitor(data){
  return put('/app/monitor/updateMonitor',data)
}

//        根据id查询设施服务计划书
function getServicePlan(data){
  return get('/app/servicePlan/getServicePlan',data)
}

//        查询某老人的设施服务计划书
function getPlanByOld(data){
  return get('/app/servicePlan/list',data)
}

//        新增设施服务计划书
function sendServicePlan(data){
  return post('/app/servicePlan/save',data)
}

//        修改设施服务计划书
function changeServicePlan(data){
  return put('/app/servicePlan/update',data)
}

//        根据id查询老人信息,返回老人信息表
function getBaseInfo(data){
  return get('/app/old/getById',data)
}

//         根据id查询同居人情报
function getCohabitInfo(data){
  return get('/app/old/getCohabitantById',data)
}

//         根据id查询紧急联系情报
function getContactInfo(data){
  return get('/app/old/getContactById',data)
}

//         根据id查询保险证资料
function getSafeInfo(data){
  return get('/app/old/getInsuranceById',data)
}

//         提交老人基本信息、身体状况、其他信息(新增)
function sendBaseInfo(data){
  return post('/app/old/save',data)
}
//         提交老人基本信息、身体状况、其他信息(修改)
function updateBaseInfo(data){
  return post('/app/old/update',data)
}

///         提交老人同居人情报
function sendCohabitInfo(data){
  return post('/app/old/saveCohabitant',data)
}

//            提交老人紧急联系情报
function sendContactInfo(data){
  return post('/app/old/saveContact',data)
}

//          提交老人保险证资料
function sendSafeInfo(data){
  return post('/app/old/saveInsurance',data)
}

//        上传图片
function sendFileUpload(data){
  return post('/app/upload/uploadFile',data)
}

//        新增服务计划书
function sendPlanContent(data){
  return post('/saveContent',data)
}
//        根据老人id查询服务内容列表
function getFacilitiesData(data){
  return get('/getContentList',data)
}

//        新增服务内容项
function sendPlanItem(data){
  return post('/saveItem',data)
}

//       修改服务计划书
function changePlanContent(data){
  return post('/updateContent',data)
}

//       修改服务内容项
function changePlanItem(data){
  return post('/updateItem',data)
}

///      根据服务内容contentId查询服务项item列表
function getItemList(data){
  return get('/getItemList',data)
}

//       上传Base64图片，不需要token
function sendUploadBase(data,config){
  return post('/app/upload/uploadBase64',data,config)
}

//       查询某老人的设施服务一览表(返回参数见model)
function getFacilityList(data){
  return get('/app/situation/list',data)
}

//       每日课程保存角色数据
function sendRoleData(data){
  return post('/app/dailyRoutine/saveRoleData',data)
}

//      每日课程获取角色数据
function getRoleData(data){
  return get('/app/dailyRoutine/getRoleDataById',data)
}

//      入浴、换床单检查表
function getExchangeList(data){
  return get('/app/bathChange/getByUnitId',data)
}

//      入浴、换床单检查表
function sendExchangeData(data,config){
  return post('/app/bathChange/save',data,config)
}

//       查询可以复制表格的时间列表
function getDateYear(data){
  return get('/app/copy/getDateById',data)
}


export{
  sendLogin,
  delWeekPlan, getWeekPlan, sendWeekPlan,
  sendVoteMeet, getVoteMeet,
  getOldmanLis,
  sendFileUpload,sendUploadBase,
  getDailyTable, getDailyCase, getDailyPoint, getDailyGain,
  sendDailyTable, sendDailyCase, sendDailyPoint, sendDailyGain,
  getNoticeList,delNotice,addNotice,changeNotice,
  getMonitor,getExecutionCycles,sendExecutionCycle,sendMonitor,changeExecutionCycle,changeMonitor,
  getServicePlan,getPlanByOld,sendServicePlan,changeServicePlan,
  getBaseInfo,getCohabitInfo,getContactInfo,getSafeInfo,sendBaseInfo,sendCohabitInfo,sendContactInfo,sendSafeInfo,
  sendPlanContent,sendPlanItem,changePlanContent,changePlanItem,getItemList,
  getFacilityList,getFacilitiesData,
  getUnit,getOldByUnit,sendRoleData,getRoleData,
  getExchangeList,sendExchangeData,
  getDateYear,
  updateBaseInfo
}