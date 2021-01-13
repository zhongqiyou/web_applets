// pages/supplier/mine/mine.js
import {offerUserList} from "../../../network/offer";
import {dateFormat ,format , toast} from "../../../utils/Tools";

const app = getApp()
Page({
  data: {
    list:[],
    isIPhone:'',
    screen: [
      { text: '时间筛选', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    screenVal:0 ,
    date:"时间筛选",
    myOfferData:[] ,
    myOfferDataCopy:[] ,
    keyword:""
  },

  onLoad (options) {
    this.setData({list:app.globalData.supplierNav,isIPhone: app.globalData.isIPhone})
    wx.hideHomeButton()
  },
  onShow(){
    this._offerUserList()
  } ,

  ///  函数事件 //



  onDeleteDate(){ //清空查询时间
   this.setData({
     date:"时间筛选" ,
     keyword:""
   })
   this._offerUserList()    
  } ,


  bindDateChange(e){   // 获取筛选时间
    this.setData({
      date:e.detail.value ,
      keyword:"" ,
      currentDate:e.detail.value
    })   
    console.log(this.data.date);
    this._offerUserList({
      time:`${this.data.date}-01`
    })
     
  } ,

  onSearch(e){    //获取搜索关键字
    this.setData({
      keyword:e.detail
     } , ()=>{
      let arr = [];
       this.data.myOfferDataCopy.map(item=>{
               if(item.name.indexOf(this.data.keyword) >= 0){
                arr.push(item)
               }
               
        })
        
       this.setData({
        myOfferData:arr
       })
    })
    
  } ,

  handleNavChange(e){ //  点击切换tabbar
    app.handleNavChange(e)
  },
 

  _offerUserList(data){
    offerUserList(data).then((res)=>{

    if(res.status === 200){

      let newArr = res.data.map((item)=>{
        return {id:item.id , offer_id:item.offer_id , material_time:item.material_time , name:item.get_offer.name , num:item.get_offer.num ,demand:item.get_offer.demand , demand_time:item.get_offer.demand_time}
     })
      newArr.forEach(item => {
          item.demand_time =  format(item.demand_time * 1000 , 'YYYY-MM-DD HH:mm:ss'); 
      });
   
      this.setData({
        myOfferData:newArr ,
        myOfferDataCopy:newArr
      })  

    }else{
      toast(res.message);
    }

    })
  } ,

  

})