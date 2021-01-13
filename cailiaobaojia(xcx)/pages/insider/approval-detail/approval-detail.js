// pages/insider/approval-detail/approval-detail.js
import {offerFind , offerUpdates , offerUpdateAudit} from "../../../network/offer";
import {dateFormat, toast , format} from "../../../utils/Tools"
Page({

  /**
   * 页面的初始数据
   */
  data: {
   listData:[] ,
   isTitle:0 ,
   examineData:[] ,
   isBtn:false
   
  },
  onJumpDetail(e){

        wx.navigateTo({
        url: `/pages/supplier/detail/detail?id=${e.currentTarget.dataset.id}&userId=${e.currentTarget.dataset.userid}&btn=${this.data.isTitle}&Approval=1` ,
        })
   

  } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isIndex == "0"){
      this.setData({
        isBtn:true
      })
    }
    const userid = wx.getStorageSync('user').id;
    this._offerFind({id:options.id});
  },

//  函数操作事件
onAgree(){   //同意
  this._offerUpdates({
    offerId:this.data.listData.id ,
    audit:2
  })  
} ,

  // 网络请求
  _offerUpdates(data){ //审核
    offerUpdates(data).then((res)=>{
          if(res.status == 200){
            wx.reLaunch({
              url: '/pages/insider/approval/approval'
            })
          }else{
            toast(res.message)
          }

    })
  } , 

  _offerFind(data){
    offerFind(data).then((res)=>{ 
      const _this = this;
     if(res.status !== 200){toast(res.message); return}
      res.data.demand_time =  dateFormat(new Date(res.data.demand_time * 1000)); 
      const userId = wx.getStorageSync('user').id;
     res.data.get_offer_admin.forEach((item , index) => {
       if(item.user_audit_id == userId && item.audit == 2) {
            _this.setData({
              isBtn:false
            })
       }

        if(item.audit == 0){
          item.audit = "未审核";
        }
        else if(item.audit == 1){
          item.audit = "未通过";
        }
        else if(item.audit == 2){
          item.audit = "通过";
        };
        item.updated_at = format(parseInt(item.updated_at)*1000 , 'YYYY-MM-DD HH:mm:ss');

        if(res.data.get_offer_admin[index].audit === "未审核"){
          _this.setData({
            isTitle:1
          })
        }
      });

      
            
      this.setData({
        listData:res.data ,
        examineData: res.data.get_offer_admin
      })
    })
  } ,

})