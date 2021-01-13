import { debounce, format  ,dateFormat , toast} from '../../../utils/Tools';
import {offerList} from "../../../network/offer";

const app = getApp()
Page({
  data:{
    value:'',
    list:[],
    isIPhone:'',
    listData:[]
  },
  onLoad(options){
    this.setData({list:app.globalData.supplierNav,isIPhone: app.globalData.isIPhone})
    wx.hideHomeButton()
    // this.handleSearch = debounce(this.handleSearch)
  },
  onShow(){
    this._offerList({
      search:this.data.value
    })
    
  } ,
  ///  函数事件 //

  // handleSearch(e){
  //   this.setData({
  //     value: e.detail
  //   })
  //   console.log(this.data.value);
    
  // },

  onReceive(){ 
    wx.requestSubscribeMessage({
      tmplIds: ['Z183c2KqHsYPo9zmCAv-dbeTRY2yDqDF7h6xQuMVZDU'],
      success (res) { 
        if(res['Z183c2KqHsYPo9zmCAv-dbeTRY2yDqDF7h6xQuMVZDU'] !== 'accept'){
            toast("你将不能收到审核信息相关通知");
        }
      }
    })
  } ,

 
  handleNavChange(e){ //  点击切换tabbar
    app.handleNavChange(e)
  },

 _offerList(data){
   
  offerList(data).then((res)=>{
    if(res.status === 200){
      res.data.forEach(item => {
        item.demand_time =  format(item.demand_time * 1000 , "YYYY-MM-DD HH:mm:ss"); 
     });
       this.setData({
        listData:res.data.reverse()
       })
    }else{
      toast(res.message)
    }
  

  })
 } ,
 // 点击软键盘回车
 onSearch: function(e) {
  this.setData({
        value: e.detail
  } , ()=>{
    this._offerList({search:this.data.value});
  })    
},
  
})