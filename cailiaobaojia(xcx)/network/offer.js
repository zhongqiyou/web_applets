import axios from './network'


///  报价列表(供应商)
function offerList(data){
  return axios({
    url:'/offerApiToken/offerList' ,
    data
  })
}

// 报价列表(内部主管)
function offerList2(data){
  return axios({
    url:'/insideApiToken/offerList' ,
    data
  })
}

// 报价汇总(内部主管)
function offerListTotal(data){
  return axios({
    url:'/insideApiToken/offerLists' ,
    data
  })
}

// 报价详情(内部主管)
function offerFind(data){
  return axios({
    url:'/insideApiToken/offerFind' ,
    data
  })
}

// 审核(内部主管)
function offerUpdateAudit(data){
  return axios({
    url:'/insideApiToken/offerUpdate' ,
    data
  })
}

// 审核信息(内部主管)
function offerUserAdmin(data){
  return axios({
    url:'/offerApiToken/offerUserAdmin' ,
    data
  })
}

// 报料汇总(内部主管)
function materialList(data){
  return axios({
    url:'/insideApiToken/materialList' ,
    data
  })
}

// 报价订单是否结束(内部主管)
function offerStatus(data){
  return axios({
    url:'/insideApiToken/offerStatus' ,
    data
  })
}

// 报价用户列表
function offerUserList(data){
  return axios({
    url:'/offerApiToken/offerUserList' ,
    data
  })
}

// 报价详情(供应商)
function offerInfo(data){
  return axios({
    url:'/offerApiToken/offerInfo' ,
    data
  })
}

// 报价详情(内部-主管)
function offerInfoAdmin(data){
  return axios({
    url:'/offerApiToken/offerInfoAdmin' ,
    data
  })
}

// 报价更新(新增报价)
function offerUpdate(data){
  return axios({
    url:"/offerApiToken/offerUpdate" ,
    data
  })
}

// 获取绑定数据(新增报价:报价人名字 , 报价人电话)
function userInfo(data){
  return axios({
    url:"/offerApiToken/userInfo" ,
    data
  })
}


// 报价审核同意
function offerUpdates(data){
  return axios({
    url:"/insideApiToken/offerUpdates" ,
    data
  })
}



export{
  offerList ,
  offerUserList ,
  offerInfo ,
  offerUpdate ,
  userInfo ,
  offerList2 ,
  materialList ,
  offerFind ,
  offerInfoAdmin ,
  offerUserAdmin ,
  offerUpdateAudit ,
  offerListTotal ,
  offerStatus ,
  offerUpdates

}