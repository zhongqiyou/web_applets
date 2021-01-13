import axios from './network'

// 获取新增报料是,绑定信息
function getProjectInfo(){
  return axios({
    url:'/projectApiToken/getProjectInfo'
  })
}


///   获取砼等级
function getTongLevel(){
  return axios({
    url:'/projectApiToken/getConcrete' 
  })
}

function getTongLevel2(){
  return axios({
    url:'/projectApiToken/getSecond' 
  })
}

///    获取卸料列表
function getUninstallList(){
  return axios({
    url:"/projectApiToken/getUninstall"
  })
}

// 塌落度列表   
function unloadList(){
  return axios({
    url: '/projectApiToken/getLoad'
  })
}

////       获取报料列表(项目方-主管)
function getMaterialList(data){
  return axios({
    url:'/projectApiToken/getMaterialList ',
    data
  })
}

////       获取报料列表(内部人员-资料员)
function getMaterialListInside(data){
  return axios({
    url:'/projectApiToken/getMaterialListInside',
    data
  })
}

////       获取报料详细
function getMaterialDetail(data){
  return axios({
    url:'/projectApiToken/getMaterialFind',
    data
  })
}

///     新增报料
function sendMaterialAdd(data){
  return axios({
    url:'/projectApiToken/materialAdd',
    data
  })
}


///   获取报料审核信息(内-销售员 / 项目方-主管)
function getApproval(data){
  return axios({
    url:'/projectApiToken/getMaterialAuditInfo',
    data
  })
}

///   提交审核(内-销售员 / 项目方-主管)
function sendApproval(data){
  return axios({
    url:'/projectApiToken/materialAuditPush',
    data
  })
} 


function getUpdate(data){
  return axios({
    url:'/projectApiToken/getUpdate',
    data
  })
}  






export{
  getTongLevel,
  getTongLevel2 ,
  getUninstallList,
  sendMaterialAdd,
  getMaterialList,
  getMaterialDetail ,
  sendApproval ,
  getApproval ,
  getMaterialListInside ,
  getProjectInfo ,
  getUpdate ,
  unloadList
}