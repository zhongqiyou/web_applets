// pages/insider/approval/approval.js
import {offerList2} from "../../../network/offer";
import {dateFormat ,unique ,debounce ,toast , format} from "../../../utils/Tools";
const app = getApp()
Page({
  data: {
    selectList:['全部站点'],
    select:'全部站点' ,
    list:[],
    isIPhone:'' ,
    listData:[] ,
    listDataCopy:[]
  },
  onLoad (options) {
    this._offerList2({
      audit:0
    })
    this.setData({list:app.globalData3.supplierNav,isIPhone: app.globalData3.isIPhone})
    wx.hideHomeButton()

    this.handleChangeTabs = debounce(this.handleChangeTabs)
    
  },
// 函数事件
  handleNavChange(e){ //  点击切换tabbar
    app.handleNavChange(e)
  },

  handleChangeTabs(e){///    点击切换tabs
    let {index} = e.detail
    this.setData({
      select:'全部站点' 
    })
    if(index == 1){
      index = 2
    }

    this._offerList2({
      audit:index
    })
    
  },

  bindPickerChange(e){  //切换站点

    
  

    

    this.setData({
      listData:this.data.listDataCopy ,
      select:this.data.selectList[e.detail.value]
    })


      if(this.data.select == "全部"){
         this.setData({
          listData:this.data.listDataCopy ,
          select:this.data.selectList[0]
         })
         return
    }

    let newData = [];
    this.data.listData.map((item)=>{
      if(item.demand == this.data.select){
        newData.push(item)   
       }
    })

   this.setData({
    listData:newData
   })

  } ,



  _offerList2(data){ //获取列表数据

    offerList2(data).then((res)=>{
      if(res.status !== 200) {toast(res.message); return}
 
        
        let siteArr = res.data.map((item)=>{
              return item.demand
        })
        siteArr.unshift("全部");
        res.data.forEach(item => {
          item.demand_time =  format(item.demand_time * 1000 , "YYYY-MM-DD HH:mm:ss"); 
        });

        let dataList = [];
        res.data.map(item=>{
          if(item.audit == data.audit){
            dataList.push(item)
          }
        
        })

        console.log(dataList)
        
       

       this.setData({
        selectList:unique(siteArr),
        listData:dataList ,
        listDataCopy:dataList
       })
    })
   } ,

  

})