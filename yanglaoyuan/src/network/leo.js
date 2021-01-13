import {get,post,put} from './http'

// 24小时计划表-提交
function subHourSchedule (data) {
	return post('/app/calendar/save', data);
}

// 24小时计划表-获取数据
function getHourSchedule (data) {
	return get('/app/calendar/getById', data);
}

// 护理会议要点记录-提交
function subMeetingCare (data) {
	return post('/app/meetingCare/save', data);
}

// 护理会议要点记录-获取数据
function getMeetingCare (data) {
	return get('/app/meetingCare/getById', data);
}

// 服务负责人会议要点记录-提交
function subServiceMeeting (data) {
	return post('/app/meetingMain/save', data);
}

// 服务负责人会议要点记录-获取数据
function getServiceMeeting (data) {
	return get('/app/meetingMain/getById', data);
}

// 设施服务计划书（2-1）-获取数据
function getFacilitiesData (data) {
	return get('/getContentList', data);
}

// 入所者一览表 - 获取列表数据
function getEntrantsList (data) {
	return get('/app/beds/getOldMans', data);
}
// 入所者一览表 - 退所
function bedsCheckout (data) {
	return get('/app/beds/checkOut', data);
}

export default {
	subHourSchedule,
	getHourSchedule,
	subMeetingCare,
	getMeetingCare,
	subServiceMeeting,
	getServiceMeeting,
	getFacilitiesData,
	getEntrantsList,
	bedsCheckout
}