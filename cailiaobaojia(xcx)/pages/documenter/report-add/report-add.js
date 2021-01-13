const { getTongLevel, getUninstallList, sendMaterialAdd ,getProjectInfo ,unloadList , getTongLevel2} = require("../../../network/documenter");
const { toast, debounce , format} = require("../../../utils/Tools");
let levelList = [],normsList = [],wayData = [] , slumpList = [];
const app = getApp();
// pages/documenter/report-add/report-add.js
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

  getHandlePouring(){
   this.setData({
     show:true
   });
  } ,
  onClose(){
    // this.setData({
    //   show:false
    // });
  } ,
  onDetermineDatetime(event) {
    this.setData({
      currentDate: event.detail,
      show:false ,
      date:format(event.detail , "YYYY-MM-DD HH:mm:ss")
    });
  },

  onCloseDatetime(){
     this.setData({
      show:false
     })
  } ,

  handleNavChange(e){ 
    app.handleNavChange(e)
  },
  onLoad (options) {
    this.setData({list:app.globalData2.supplierNav,isIPhone: app.globalData2.isIPhone});
    wx.hideHomeButton()
    this._getTongLevel();   
    this._getTongLevel2();        
    this._getUninstallList()
    this._getProjectInfo();
    this._unloadList();
    this.handleSubmit = debounce(this.handleSubmit,1000)
  },

  //       函数事件        //
  handleSubmit(e){  ///   点击了提交    
    console.log(e);

   
    
    const {id} = wx.getStorageSync('user');
    let data = e.detail.value
    for(let v in data){
      if(!data[v]){
        toast('操作失败,全部选项必填')
        return
      }
    }
    Object.assign(data,{
      userId:id,
      concreteId: this.data.levelId,
      concreteIds: this.data.normsId,
      uninstallId: this.data.wayId, 
      collapse:this.data.slumpId ,
      onLine: this.data.internetId
    })
   
    if(data.concreteId == "" || data.concreteIds == "" || data.uninstallId == ""  || data.collapse == "") {
      toast('操作失败,全部选项必填')
      return
    }

     
    


      sendMaterialAdd(data).then(res=>{
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
      
    
  },

  getHandleVolume(e){
       this.setData({
         volume:e.detail.value.replace(/[^\d\.]/g, '')
       });
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
    let id = "";
    wayData.map(item => {
      if(this.data.wayList[value] === item.name)  id = item.id
    })  
    this.setData({
      wayVal: this.data.wayList[value],
      wayId: id
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


  handleNetwork(e){   ///  点击了选择上网
    const {value} = e.detail
    this.setData({
      internet: this.data.internetList[value],
      internetId:value
    })
  },
  ///       网络请求      //
  _getTongLevel(){  //   获取砼列表1
    getTongLevel().then(res=>{
      if(res.status === 200){
        levelList = res.data;
        let arr = res.data.map(item => item.name)
          this.setData({
            level: arr
          })
      }else{
        toast(res.message)
      }

    })
  },

  _getTongLevel2(){  //   获取砼列表2
    getTongLevel2().then(res=>{
      if(res.status === 200){
        normsList = res.data;
        let arr = res.data.map(item => item.name)
          this.setData({
            norms: arr
          })
      }else{
        toast(res.message)
      }
    })
  },
  
_unloadList(){ //获取塌落度列表
  unloadList().then(res=>{
    if(res.status === 200){
      slumpList = res.data;
      let arr = res.data.map(item => item.name)
        this.setData({
          slump: arr
        })
    }else{
      toast(res.message)
    }
  })
} ,
  
  _getUninstallList(){ ///   获取卸料方式列表
    getUninstallList().then(res=>{
       if(res.status === 200){
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
       }else{
         toast(res.message);
       }
    })
  } ,
  _getProjectInfo(){  //获取绑定数据(施工单位 / 联系方式 / 联系人姓名)
    getProjectInfo().then((res)=>{
     if(res.status === 200){
      let data = {company:res.data.project_name , phone:res.data.mobile , name:res.data.nick_name}
      this.setData({
        bindingInfo:data
      })
     }else{
      toast(res.message);
     }
    })

  }
})