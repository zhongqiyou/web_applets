// pages/project/offer-order/offer-order.js
import {debounce, toast } from "../../../utils/Tools";
const { getMaterialList ,getMaterialListInside } = require("../../../network/documenter");
Page({
  data: {
    tabsIndex: 0,
    dataList:[] ,
  },
  onLoad (options) {
    wx.hideHomeButton()

  } ,
  onShow(){
    this._getMaterialList();
    this.handleChangeTabs = debounce(this.handleChangeTabs);
  },

  // 函数事件
  
  handleChangeTabs(e){///    点击切换tabs
    const {index} = e.detail  
    this.setData({
      tabsIndex: index,
      dataList: []
    })
    this._getMaterialList()
  },
   ///      网络请求
   _getMaterialList(){
    const {id , identity} = wx.getStorageSync('user');     
     const data = {
      audit:this.data.tabsIndex 
    }
    //项目方主管 
    //  if(identity == 2){
    //   getMaterialList(data).then(res=>{
    //     if(res.status=== 200){
    //       this.setData({
    //         dataList: res.data
    //       })
    //     }else{
    //       toast(res.message)
    //     }
    //   })
    //  }else if(identity == 3){
      // 内部人员-销售员
      getMaterialListInside(data).then(res=>{
        if(res.status=== 200){
          this.setData({
            dataList: res.data
          })
        }else{
          toast(res.message)
        }
      })
    //  }
  }
})