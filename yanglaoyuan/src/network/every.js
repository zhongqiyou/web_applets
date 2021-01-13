import {get, post, put } from './http'
// 经过纪录表
function selectHistory(data) {
    return get("/app/passRecord/getById", data);
}

function innserHistory(data) {
    return post("/app/passRecord/save", data)
}

// 病历表
function getCaseHistory(data) {
    return get("/app/caseHistory/getCaseHistory", data);
}

function innerCaseHistory(data) {
    return post("/app/caseHistory/save", data)
}

function updateCaseHistory(data) {
    return put("/app/caseHistory/update", data)
}

function selectWholeHistory(data) {
    return get("/app/caseHistory/list", data);
}

// 病历名表

function getDisease(data) {
    return get("/app/disease/getDisease", data);
}

function innerDisease(data) {
    return post("/app/disease/save", data)
}

function updateDisease(data) {
    return put("/app/disease/update", data)
}

function selectWholeDisease(data) {
    return get("/app/disease/list", data)
}

// 基本信息 + 同意
function selectInofList(data) {
    return get("/app/assessmentInfo/list", data)
}

function insertInfoSave(data) {
    return post("/app/assessmentInfo/save", data)
}

function updateInfo(data) {
    return post("/app/assessmentInfo/update", data)
}

function selectInofQuery(data) {
    return get("/app/assessmentInfo/queryOne", data)
}

// 食事 + 服药
function selectEatList(data) {
    return get("/app/assessmentEat/list", data);
}

function selectEatListAll(data) {
    return get("/app/assessmentEat/listAll", data);
}

function insertEatSave(data) {
    return post("/app/assessmentEat/save", data);
}

function updateEat(data) {
    return post("/app/assessmentEat/update", data)
}

// 移动 + 褥瘡危険因子の評価(关联表)
function selectMoveList(data) {
    return get("/app/assessmentMove/list", data)
}

function selectMoveListAll(data) {
    return get("/app/assessmentMove/listAll", data)
}

function insertMoveSave(data) {
    return post("/app/assessmentMove/save", data);
}

function updateMove(data) {
    return post("/app/assessmentMove/update", data)
}

// 入浴 + 更衣
function selectBatheList(data) {
    return get("/app/assessmentBathe/list", data)
}

function selectBatheListAll(data) {
    return get("/app/assessmentBathe/listAll", data)
}

function innsetBatheSave(data) {
    return post("/app/assessmentBathe/save", data)
}

function updateBathe(data) {
    return post("/app/assessmentBathe/update", data)
}

// 心身机能
function selectPhysiologyList(data) {
    return get("/app/assessmentFunction/list", data)
}

function selectPhysiologyListAll(data) {
    return get("/app/assessmentFunction/listAll", data)
}

function innsetPhysiologySave(data) {
    return post("/app/assessmentFunction/save", data)
}

function updatePhysiology(data) {
    return post("/app/assessmentFunction/update", data)
}

// 环境因子+汇总
function selectDivisorList(data) {
    return get("/app/assessmentSummary/list", data)
}

function selectDivisorListAll(data) {
    return get("/app/assessmentSummary/listAll", data)
}

function innsetDivisorSave(data) {
    return post("/app/assessmentSummary/save", data)
}

function updateDivisor(data) {
    return post("/app/assessmentSummary/update", data)
}


// 褥疮对策评估表（有褥疮时）(关联表)
function selectBedsoreList(data) {
    return get("/app/bedsore/list", data);
}

function insertBedsoreList(data) {
    return post("/app/bedsore/save", data)
}

function updateBedsoreList(data) {
    return post("/app/bedsore/update", data)
}

// 获取所有老人信息（一览关联表）
function selectOldMans(data) {
    return get("/app/beds/getOldMans", data)
}


// 褥疮对策的评估和护理计划
function selectPlan(data) {
    return get("/app/carePlan/getPlan", data)
}

function selectPlanAll(data) {
    return get("/app/carePlan/getList", data);
}

function insertPlan(data) {
    return post("/app/carePlan/save", data);
}

function updatePlan(data) {
    return post("/app/carePlan/update", data)
}

// 影响评价排泄表
function selectExcretion(data) {
    return get("/app/assessment/getPlan", data)
}

function selectExcretionList(data) {
    return get("/app/assessment/list", data)
}

function insertExcretion(data) {
    return post("/app/assessment/save", data)
}

function updateExcretion(data) {
    return post("/app/assessment/update", data)
}
//查询可以复制表格的时间列表
function getDateById(data) {
    return get('/app/copy/getDateById', data)
}

// 根据年份获取年号
function getYear(data) {
    return get("/app/home/getYear", data);
}




export {
    selectHistory,
    innserHistory,
    getCaseHistory,
    innerCaseHistory,
    updateCaseHistory,
    selectWholeHistory,
    getDisease,
    innerDisease,
    updateDisease,
    selectWholeDisease,
    selectInofList,
    insertInfoSave,
    updateInfo,
    selectEatList,
    selectEatListAll,
    insertEatSave,
    updateEat,
    selectMoveList,
    selectMoveListAll,
    insertMoveSave,
    updateMove,
    selectBatheList,
    selectBatheListAll,
    innsetBatheSave,
    updateBathe,
    selectPhysiologyList,
    selectPhysiologyListAll,
    innsetPhysiologySave,
    updatePhysiology,
    selectDivisorList,
    selectDivisorListAll,
    innsetDivisorSave,
    updateDivisor,
    selectBedsoreList,
    insertBedsoreList,
    updateBedsoreList,
    selectOldMans,
    selectPlan,
    insertPlan,
    updatePlan,
    selectExcretion,
    insertExcretion,
    updateExcretion,
    getDateById,
    getYear,
    selectExcretionList,
    selectInofQuery,
    selectPlanAll








}