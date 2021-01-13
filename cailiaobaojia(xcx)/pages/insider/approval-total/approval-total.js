// pages/insider/approval-total/approval-total.js
import {materialList} from "../../../network/offer";
import { toast } from "../../../utils/Tools";
const app = getApp()
Page({
  data: {
    screen: [
      { text: '时间筛选', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    screenVal:0 ,
    list:[],
    isIPhone:'' ,
    date:"时间筛选" , 
    listData:[] ,
    listDataCopy:[] ,
    keyword:""
  },
// 生命周期
  onLoad (options) {
    this._materialList({
      audit:99999
    });
    this.setData({list:app.globalData3.supplierNav,isIPhone: app.globalData3.isIPhone})
    wx.hideHomeButton()
  },

  // 函数操作
  onDeleteDate(){ //清空查询时间
    this.setData({
      date:"时间筛选" , 
      keyword:""
    });

    this._materialList({
      audit:99999
    });
     
   } ,
  bindDateChange(e){ //获取查询时间
    this.setData({
      keyword:"" ,
      date:e.detail.value ,
      currentDate:e.detail.value
    }) 
    
    this._materialList({
      audit:99999 ,
      time:this.data.date + "-01"
    })
    
  } ,
  onSearch(e){ //获取查询关键字
   this.setData({
    keyword:e.detail
   } , ()=>{
    let arr = [];
     this.data.listDataCopy.map(item=>{
             if(item.construction_name.indexOf(this.data.keyword) >= 0){
              arr.push(item)
             }
      })
      
     this.setData({
       listData:arr
     })
  })
  } ,
  

  handleNavChange(e){ //  点击切换tabbar
    app.handleNavChange(e)
  },


// 网络请求
  _materialList(data){
    materialList(data).then((res)=>{
      if(res.status !== 200){toast(res.message); return}
    this.setData({
      listData:res.data ,
      listDataCopy:res.data
    })
    
    })
  }


})