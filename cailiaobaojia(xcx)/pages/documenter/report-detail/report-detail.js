const { getMaterialDetail , getApproval , sendApproval} = require("../../../network/documenter");
const { toast } = require("../../../utils/Tools");

// pages/documenter/report-detail/report-detail.js
Page({
  data: {
    isRefuse: false,
    isNeed: true ,
    approvalData:{}
  },
  onLoad (options) {
    if(options.btn){
      this.setData({
        isNeed: false
      })
    }
    const {id} = wx.getStorageSync('user');
    const data = {
      userId:id,
      id: options.id
    }
    this._getMaterialDetail(data)
    this._getApproval(options.id)
    this.setData({
      approvalData:{id:parseInt(options.id)}
    })
  },
  ///       函数事件      //
  onDisplay(){
    this.setData({
      isRefuse: true
    }) 
  } ,
  onClose(){

    
  const {identity} = wx.getStorageSync('user');
  // if(identity == 2){
  //   this.setData({
  //     isRefuse: false
  //   })         
  //   }else if(identity == 3){
      // if(this.data.auditInfo[0].admin == 1 && this.data.auditInfo[0].audit == 3){
        this.setData({
          isRefuse: false
        }) 
        // return
      // }
      // toast("待项目方主管先审核")
    // }
   
  },
  handleRefuse(){  ///   驳回点击了确定
    console.log("确定按钮");
    if(!this.data.approvalData.content) {toast("请输入驳回内容 , 重新审核"); return}
    
    

    const {identity} = wx.getStorageSync('user');
    this.setData({
      isRefuse: false
    })
    let data = this.data.approvalData;
    data.is = 0;

    console.log(data);
    

    // if(identity == 2){
    //          this._sendApproval(data);        
    // }else if(identity == 3){
      // if(this.data.auditInfo[0].admin == 1 && this.data.auditInfo[0].audit == 3){
             this._sendApproval(data);
    //          return 
    //   }
    //   toast("待项目方主管先审核")
    // }
    
  },

  getRejectContent(e){   //获取驳回内容
      let data = this.data.approvalData;
      data.content = e.detail.value;
      this.setData({
        approvalData:data
      })      
  } , 

onAgree(){      ///   点击了同意



   const {identity} = wx.getStorageSync('user');

    let data = this.data.approvalData;
    data.is = 1;
    // if(identity == 2){
    //          this._sendApproval(data);        
    // }else if(identity == 3){
    //   if(this.data.auditInfo[0].admin == 1 && this.data.auditInfo[0].audit == 3){
        this._sendApproval(data);
    //          return
    //   }
    //   toast("待项目方主管先审核")
    // }
  
} ,

  ////          函数事件         ///
  _getMaterialDetail(data){
    getMaterialDetail(data).then(res=>{
      if(res.status === 200){
        this.setData({
          info:res.data
        })
      }else{
        toast(res.message);
      }
      
    })
  } , 

  _getApproval(id){    
    getApproval({id}).then(res=>{
       if(res.status === 200){
        this.setData({
          auditInfo:res.data.reverse()
        })
       }else{
        toast(res.message);
       }

    })
  } ,

  _sendApproval(data){    
    sendApproval(data).then(res=>{

      if(res.status === 200){
        wx.reLaunch({
          url: "/pages/project/offer-order/offer-order"
        });    
      }else{
        toast(res.message)
      }
       
    })
  }
})
