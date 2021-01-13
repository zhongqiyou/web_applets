// pages/documenter/failed-detail/failed-detail.js\
const { getTongLevel,getTongLevel2 , getUninstallList, sendMaterialAdd ,getProjectInfo ,getMaterialDetail , getApproval , unloadList , getUpdate} = require("../../../network/documenter");
const { toast, throttle , format  } = require("../../../utils/Tools");
let levelList = [],normsList = [],wayData = [] , slumpList = [];
Page({
  data: {
    level:['请选择'], //砼列表1
    norms:['请选择'], //砼列表2
    wayList:['请选择'],//卸料列表
    slump:["请选择"] , //塌落度列表
    internetList:['否','是'],
    levelVal:'请选择',
    slumpValue:"请选择" ,
    normsVal:'请选择',
    wayVal:'请选择',
    normsId:'',
    levelId:'' ,
    wayId:'',
    slumpId:"" ,
    internet:'否',
    internetId:0 ,
    list:[] ,
    isIPhone:'',
    volume:"" ,
    bindingInfo:{} ,


    currentDate: new Date().getTime(),
    show:false ,
    date:""

    
  },

  onLoad (options) {
    this.setData({
      orderId:options.id
    })
    const {id} = wx.getStorageSync('user');
    const data = {
      userId:id,
      id: options.id
    }
    this._getMaterialDetail(data)
    this._getApproval(options.id)

  
   
    this._getUninstallList();
    this._getProjectInfo();
    this.handleSubmit = throttle(this.handleSubmit,3000)
  },
//  函数方法

getHandlePouring(){
  this.setData({
    show:true
  });
 } ,

 onDetermineDatetime(event) {
  let arr =  this.data.info;
  arr.pouring = format(event.detail , "YYYY-MM-DD HH:mm:ss");
  this.setData({
    currentDate: event.detail,
    show:false ,
    info:arr
  });


  
},

onCloseDatetime(){
   this.setData({
    show:false
   })
} ,



handleSubmit(e){  ///   点击了提交    

  let data = e.detail.value
  for(let v in data){
    if(!data[v]){
      toast('操作失败,全部选项必填')
      return
    }
  }
  
  if(this.data.levelId == "" || this.data.normsId == "" || this.data.wayId == "" || this.data.slumpId == ""){
    toast('操作失败,全部选项必填')
    return
  }
  Object.assign(data,{
    id:this.data.orderId ,
    concreteId: this.data.levelId,
    concreteIds: this.data.normsId,
    uninstallId: this.data.wayId, 
    collapse:this.data.slumpId ,
    onLine: this.data.internetId
  })
 
  console.log(data);

  delete data.rejectContent 
 this._getUpdate(data);
  
  
 } ,
 handleChangeLevel(e){ ///  切换了砼等级
  const {value} = e.detail
  let id = "";
  levelList.map(item => {
    if(this.data.level[value] === item.name)  id = item.id
  })    
  this.setData({
    levelVal: this.data.level[value] ,
    levelId:id
  })

},
handleNorms(e){   ///  点击选择了规格(砼)
  const {value} = e.detail;
  let id = "";
  normsList.map(item => {
    if(this.data.norms[value] === item.name)  id = item.id
  })  
  this.setData({
    normsVal: this.data.norms[value],
    normsId:id
  })
},
  handleUninstall(e){     ///  点击了卸料方式
    const {value} = e.detail
    this.setData({
      wayVal: this.data.wayList[value],
      wayId: wayData[value].id
    })
  },

  handleNetwork(e){   ///  点击了选择上网
    const {value} = e.detail
    this.setData({
      internet: this.data.internetList[value],
      internetId:value
    })
  },

  handleSlump(e){     ///  点击了塌落度方式
    const {value} = e.detail
    let id = "";
    slumpList.map(item => {
      if(this.data.slump[value] === item.name)  id = item.id
    }) 
    this.setData({
      slumpValue:this.data.slump[value] ,
      slumpId:id
    })    
  },
  

   ///       网络请求      //
   _getTongLevel(){  //   获取砼列表1
    const _this = this;
    getTongLevel().then(res=>{
      if(res.status === 200){
        levelList = res.data;
        let concrete = "";
        let id = "";
        res.data.map(item=>{
          if(item.id == _this.data.info.concreteId){
            concrete = item.name;
            id = item.id
          }
        })

        let arr = res.data.map(item => item.name)
          this.setData({
            level: arr ,
            levelVal:concrete ,
            levelId:id

          })
      }else{
        toast(res.message)
      }

    })
  },

  _getTongLevel2(){  //   获取砼列表2
    const _this = this;
    getTongLevel2().then(res=>{
      if(res.status === 200){
        normsList = res.data;
        let arr = res.data.map(item => item.name)
        let concrete = "";
        let id = ""
        res.data.map(item=>{
          if(item.id == _this.data.info.concrete_ids){
            concrete = item.name;
            id = item.id;
            
          }
        })

          this.setData({
            norms: arr ,
            normsVal:concrete ,
            normsId:id
          })
      }else{
        toast(res.message)
      }
    })
  },

  _getUninstallList(){ ///   获取卸料方式列表
    getUninstallList().then(res=>{
      let arr = []
      wayData = res.data
      if(res.data.length > 0){
        res.data.forEach(res=>{
          arr.push(res.name)
        })
        this.setData({
          wayList: arr
        })
      }
    })
  } ,

  _unloadList(){ //获取塌落度列表
    const _this = this;
    unloadList().then(res=>{
      if(res.status === 200){
        slumpList = res.data;
        let arr = res.data.map(item => item.name);
        let collapse = "";
        let id = ""

        res.data.map(item=>{
          if(item.id == _this.data.info.collapse){
            collapse = item.name;
            id = item.id;
          }
        })
          this.setData({
            slump: arr ,
            slumpValue:collapse,
            slumpId:id
          })
      }else{
        toast(res.message)
      }
    })
  } ,
  _getProjectInfo(){  //获取绑定数据(施工单位 / 联系方式 / 联系人姓名)
    getProjectInfo().then((res)=>{
      console.log(res);
      let data = {company:res.data.project_name , phone:res.data.mobile , name:res.data.nick_name}
      this.setData({
        bindingInfo:data
      })
      
    })

  } ,
  _getMaterialDetail(data){
    getMaterialDetail(data).then(res=>{
      if(res.status === 200){
        this.setData({
          info:res.data ,
          // levelVal:res.data.getParent.name,
          // normsVal:res.data.get_concrete.name,
          wayVal:res.data.get_uninstall.name,
          internet: res.data.onLine === "0" ? "否" : "是",
          // normsId:res.data.get_concrete.id ,
          wayId: res.data.get_uninstall.id,
          internetId: res.data.onLine 
          
        } , ()=>{
          this._unloadList();
          this._getTongLevel();
          this._getTongLevel2();
        })
      }else{
        toast(res.message);
      }
      
    })
  } , 

  _getApproval(id){    
    getApproval({id}).then(res=>{
      let title = "";
       if(res.status === 200){
         res.data.map(item =>{
           if(item.content){
             title = item.content;
           }
         })
        this.setData({
          rejectContent:title
        })
       }else{
        toast(res.message);
       }

    })
  } ,

  _getUpdate(data){
    getUpdate(data).then(res=>{
      if(res.status === 200){
        toast('提交成功','success')
        setTimeout(_=>{
          wx.reLaunch({
            url: '/pages/documenter/mine-report/mine-report'
          });
        },1000)
      }else{
        toast('提交失败','loading')
      }
    })
  }


})