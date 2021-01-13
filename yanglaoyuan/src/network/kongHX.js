import { get, post, put } from './http'
//整容行程表页面api
function getConingList(data) {
    return get('/app/appearance/list', data)
}
function addItem(data) {
    return post('/app/appearance/save', data)
}
function editItem(data) {
    return post('/app/appearance/update', data)
}
//更衣行程表页面api
function getClothesList(data) {
    return get('/app/dressed/list', data)
}
function addClothesItem(data) {
    return post('/app/dressed/save', data)
}
function editClothesItem(data) {
    return post('/app/dressed/update', data)
}
//入浴行程表页面api
function getWashList(data) {
    return get('/app/bathe/list', data)
}
function sendAdd(data) {
    return post('/app/bathe/save', data)
}
function sendModify(data) {
    return post('/app/bathe/update', data)
}
//饮食行程表页面api
function getFoodList(data) {
    return get('/app/diet/getById', data)
}
function foodAdd(data) {
    return post('/app/diet/saveOrUpdate', data)
}
//排泄行程表页面
function getExcretionList(data) {
    return get('/app/excretion/list', data)
}
function excretionAdd(data) {
    return post('/app/excretion/save', data)
}
function excretionModify(data) {
    return post('/app/excretion/update', data)
}
//排泄附件api
function getAttachment(data) {
    return get('/app/attachment/queryList', data)
}
//排泄-扩入力表页面api
function getExcretionRecord(data) {
    return get('/app/excretionRecord/list', data)
}
function excretionRecordAdd(data) {
    return post('/app/excretionRecord/save', data)
}
function excretionRecordModify(data) {
    return post('/app/excretionRecord/update', data)
}
//经过表
function getRecord(data) {
    return get('/app/pass/getById', data)
}
function recordAddModify(data) {
    return post('/app/pass/save', data)
}
//首页通知
function unreadNotice(data) {
    return get('/app/notification/getUnreadNotice', data)
}
function notificationCallback(data) {
    return get('/app/notification/update', data)
}
//根据老人院id获取单元
function getUnitByNursingId(data) {
    return get('/app/beds/getUnitByNursingId', data)
}
//获取机构列表
function getNursingHome(data) {
    return get('/app/login/getNursingHome', data)
}

//输入工号获取用户名与机构名字
function getUserInfo(data) {
    return get('/app/login/getUserInfo', data)
}
//获取出勤人员
function getAttendance(data) {
    return get('/app/home/getAttendance', data)
}
//更换员工登录密码
function changePassword(data) {
    return get('/app/home/changeAdminUserPassword', data)
}
//更换员工登录密码
function changePortrait(data) {
    return get('/app/home/changeAdminUserPortrait', data)
}
//分页查询员工列表
function listAdminUser(data) {
    return get('/app/home/listAdminUser', data)
}
//获取某单位所有老人床位列表
function getOldMans(data) {
    return get('/app/beds/getOldMans', data)
}
//获取某单位所有老人列表
function listOldManByUnitId(data) {
    return get('/app/home/listOldManByUnitId', data)
}
//查询食事-扩入力表
function getByUnitId(data) {
    return get('/app/food/getByUnitId', data)
}
//提交食事-扩入力表
function mealSave(data) {
    return post('/app/food/save', data)
}
//获取老人的介护等级
function getOldManLevel(data) {
    return get('/app/home/getOldManLevel', data)
}
//根据邮编查询地址,返回日本地址表
function getPossByPoss3(data) {
    return get('/app/old/getPossByPoss3', data)
}
//重新入所
function reCheckIn(data) {
    return get('/app/beds/reCheckIn', data)
}
//查询可以复制表格的时间列表
function getDateById(data){
    return get('/app/copy/getDateById',data)
}
//生成老人id
function getOldmanId(data){
    return get('/app/old/generateID',data)
}
export {
    getConingList,
    addItem,
    editItem,
    getClothesList,
    addClothesItem,
    editClothesItem,
    sendAdd,
    sendModify,
    getWashList,
    getFoodList,
    foodAdd,
    getExcretionList,
    excretionAdd,
    excretionModify,
    getAttachment,
    getExcretionRecord,
    excretionRecordAdd,
    excretionRecordModify,
    getRecord,
    recordAddModify,
    notificationCallback,
    getNursingHome,
    getUserInfo,
    getAttendance,
    changePassword,
    listAdminUser,
    changePortrait,
    getUnitByNursingId,
    getOldMans,
    getByUnitId,
    mealSave,
    listOldManByUnitId,
    getOldManLevel,
    getPossByPoss3,
    reCheckIn,
    getDateById,
    unreadNotice,
    getOldmanId
}