import {subscribeMessageSend} from "../../network/subscribe";
import {offerStatus} from "../../network/offer";
import {toast} from "../../utils/Tools"
Component({
  options:{
    multipleSlots: true
  } ,
  data: {},
  properties: {
    searchVal:{
      type: String,
      value: ''
    } ,
    isOfferDate:{
      type:Boolean ,
      value:false
    } , 
    isOfferNum:{
      type:Boolean ,
      value:false
    } ,
    url:{
      type:String , 
      value:""
    } , 
    arrData:{
      type:Array , 
      value:[]
    } , 
    btnTitle:{
      type:String , 
      value:""
    } ,
    isIndex:{
      type:String ,
      value:""
    } ,
    isRemind:{
      type:Boolean ,
      value:false
    } ,
    isJurisdiction:{
      type:Number , 
      value:0
    }  ,
    isJurisdictionNone:{
       type:Number ,
       value:1
    } ,
    isBtn:{
      type:Boolean , 
      value:false
    }

  },
  methods: {
    onJump(e){    
    if(this.properties.isJurisdiction){
      this._offerStatus({id:e.currentTarget.dataset.id} ,e.currentTarget.dataset.src );
      return
    }
  
    
     if(e.currentTarget.dataset.src === "") return
     wx.navigateTo({
      url: e.currentTarget.dataset.src
    });
    } , 
    onRemind(e){
      this._subscribeMessageSend({
        id:e.currentTarget.dataset.id
      })
    } ,

    _subscribeMessageSend(data){
    subscribeMessageSend(data).then(res=>{
       if(res.status === 200){
          toast("提醒成功");
       }else{
          toast("提醒失败 , 请重试");
       }
    })
  } , 
  _offerStatus(data , url){
    offerStatus(data).then(res=>{
      console.log(res);
      if(res.status === 200){
        if(res.data[0] === 2){
          wx.navigateTo({
            url
          });
        }else{
          toast("订单需要审核完成才可查看");
        }
      }else{
        toast("请刷新页面 , 重新操作");
      }
      
    })
  }

  } 
})