// pages/supplier/detail/detail.js
import {IMG_URL} from '../../../network/network';
import {offerInfo  , userInfo ,offerInfoAdmin , offerUserAdmin , offerUpdateAudit} from "../../../network/offer";
import {format, toast} from "../../../utils/Tools";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRefuse: false,
    infoData:{} ,
    isNeed:false ,
    offerData:{
      get_offer_specification:[]
    }, 
    isApprovalInfo:false ,
    left:0 , 
    formData:[] , 
    baseUrl:IMG_URL ,
    examineData:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(parseInt(options.btn)){
      this.setData({
        isNeed:true
      })
    }

    if(options.Approval){
      this.setData({
        isApprovalInfo:true
      })
    }
    
   this._userInfo();
   let {identity} = wx.getStorageSync('user');
  if(identity == 1){
    this._offerInfo({id:options.id});
  }else if(identity == 3){
    this._offerInfoAdmin({id:options.id , userId:options.userId});
    // this._offerUserAdmin({id:options.id , userId:options.userId})
  }
  },
  _userInfo(data){  //获取 报价人电话 与 报价人姓名
    userInfo(data).then((res)=>{
     if(res.status !== 200){toast(res.message); return}
           
      // let data = { mobile: res.data.get_supplier_audit_info.mobile, name: res.data.get_supplier_audit_info.nick_name, company: res.data.get_supplier.supplier_name}
      let data = { mobile: "", name: "", company: ""}
       this.setData({
           infoData:data
       })
      
    })
  } ,


  _offerInfo(data){   //供应商
    offerInfo(data).then((res)=>{
      if(res.status !== 200){toast(res.message); return}

      let form1 = res.data.get_offer_specification.map((item , index)=>{
          return {name:item.name , specification:item.specification}
       })

       let form2 = res.data.get_user_offer[0].get_offer_user.map((item , index)=>{
        return {up_money:item.up_money , money:item.money , remarks:item.remarks}
       })
 
      let assData = [];
       for(let i = 0; i < form1.length; i++){
            assData.push(Object.assign(form1[i] , form2[i]));  
       }
    

      this.setData({
        offerData:res.data ,
        formData:assData
      } , ()=>{
         setTimeout(()=>{
          let time = setInterval(()=>{
            this.setData({
              left: this.data.left += 1
            });
            if(this.data.left >= 200) clearInterval(time)
         } , 20)
         } , 1000)
      })    
    })
  } ,

  _offerInfoAdmin(data){   //内部-主管
    offerInfoAdmin(data).then((res)=>{
      if(res.status !== 200){toast(res.message); return}
      
      let form1 = res.data.get_offer_specification.map((item , index)=>{
          return {name:item.name , specification:item.specification}
       })

       let form2 = res.data.get_user_offer[0].get_offer_user.map((item , index)=>{
        return {up_money:item.up_money , money:item.money , remarks:item.remarks}
       })
 
      let assData = [];
       for(let i = 0; i < form1.length; i++){
            assData.push(Object.assign(form1[i] , form2[i]));  
       }
    

      this.setData({
        offerData:res.data ,
        formData:assData
      } , ()=>{
         setTimeout(()=>{
          let time = setInterval(()=>{
            this.setData({
              left: this.data.left += 1
            });
            if(this.data.left >= 200) clearInterval(time)
         } , 20)
         } , 1000)
      })    
    })
  } ,



// onAgree(){   //同意
//   let {id} = wx.getStorageSync('user');
//  let data =  this.data.examineData.map((item)=>{
//      if(item.user_audit_id == id){
//         return {id:item.id ,offerId:item.offer_id ,userId:item.user_id ,audit:2}
//      }  
//   })
//   console.log("```````````````````````````");
//   console.log(this.data.examineData);
//   console.log("```````````````````````````");


//    for(let i = 0; i <data.length;i++ ){
//        if(data[i]){
//          data = data[i]
//        }
//    }
//    console.log(data);
//   this._offerUpdateAudit(data)
// } ,

// onClose(){     //拒绝
//   let {id} = wx.getStorageSync('user');
//   console.log(id);
//  let data =  this.data.examineData.map((item)=>{
//      if(item.user_audit_id == id){
//         return {id:item.id ,offerId:item.offer_id ,userId:item.user_id ,audit:1}
//      }  
//   })

   
//    for(let i = 0; i <data.length;i++ ){
//        if(data[i]){
//          data = data[i]
//        }
//    }
//    this._offerUpdateAudit(data)
// },

  // _offerUserAdmin(data){ //审批信息
  //   offerUserAdmin(data).then((res)=>{
  //     if(res.status !== 200){toast(res.message); return}     
  //     res.data.forEach(item => {
  //       if(item.audit == 0){
  //         item.audit = "未审核";
  //       }
  //       else if(item.audit == 1){
  //         item.audit = "未通过";
  //       }
  //       else if(item.audit == 2){
  //         item.audit = "通过";
  //       }
  //       item.management = "内部主管";
  //       item.updated_at = this.formatDateTime(parseInt(item.updated_at));
  //       item.get_user.updated_at = this.formatDateTime(parseInt(item.get_user.updated_at));
  //      });
  //     let addObj =res.data;
  //     addObj.push({get_user_audit:res.data[0].get_user ,audit:"发起报价" , management:"供应商" , updated_at:res.data[0].get_user.updated_at})
  //     this.setData({
  //       examineData:addObj
  //     })
  //   })
  // } ,

  // _offerUpdateAudit(data){ //审核
  //   offerUpdateAudit(data).then((res)=>{
  //         if(res.status == 200){
  //           wx.reLaunch({
  //             url: '/pages/insider/approval/approval'
  //           })
  //         }else{
  //           toast(res.message)
  //         }
  //   })
  // } , 

 
formatDateTime(inputTime) { 
    var date = new Date(inputTime*1000);
    var y = date.getFullYear(); 
    var m = date.getMonth() + 1; 
    m = m < 10 ? ('0' + m) : m; 
    var d = date.getDate(); 
    d = d < 10 ? ('0' + d) : d; 
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute; 
    second = second < 10 ? ('0' + second) : second; 
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
   } ,
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})