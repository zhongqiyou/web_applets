const { getMaterialList } = require("../../../network/documenter");
import {debounce , toast } from "../../../utils/Tools";
const app = getApp();

// pages/documenter/mine-report/mine-report.js
Page({
  data: {
    tabsIndex: 0,
    dataList:[] ,
    list:[] ,
    isIPhone:'',
  },
  handleNavChange(e){ 
    app.handleNavChange(e)
  },
  onLoad (options) {
    this.setData({list:app.globalData2.supplierNav,isIPhone: app.globalData2.isIPhone});
    wx.hideHomeButton();
    this.handleChangeTabs = debounce(this.handleChangeTabs);
  },
  onShow(){
    this._getMaterialList()
  },


  ////        函数事件         //


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
    const {id} = wx.getStorageSync('user');
    const data = {
      audit:this.data.tabsIndex
    }
    getMaterialList(data).then(res=>{      
      if(res.status=== 200){
        this.setData({
          dataList: res.data
        })
      }else{
        toast(res.message)
      }
    })
  }
})