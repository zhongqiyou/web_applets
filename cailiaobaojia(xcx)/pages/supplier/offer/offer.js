// pages/supplier/offer/offer.js
import { toast , format} from '../../../utils/Tools';
import Dialog from '../../../components/dialog/dialog';
import {offerInfo , userInfo} from "../../../network/offer";
import {BASE_URL} from '../../../network/network';
import Toast from '../../../components/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData:{} ,
    imgsList:[] , 
    offerData:{
      get_offer_specification:[]
    }, 
    left:0 , 

    currentDate: new Date().getTime(),
    show:false ,
    date:""
    
  },


  getHandlePouring(){
    this.setData({
      show:true
    });
   } ,
   onClose(){
     // this.setData({
     //   show:false
     // });
   } ,
   onDetermineDatetime(event) {
     this.setData({
       currentDate: event.detail,
       show:false ,
       date:format(event.detail , "YYYY-MM-DD HH:mm:ss")
     });
   },
 
   onCloseDatetime(){
      this.setData({
       show:false
      })
   } ,


  onLoad(e){
    this._userInfo();
    this._offerInfo({id:e.id});
    this.setData({
      date:format(this.data.currentDate , "YYYY-MM-DD HH:mm:ss")
    })
   
  } ,


 
  getContent(e){  //获取填写字段
   let data = this.data.offerData;
     switch(e.target.dataset.type){
       case "up_money":
        data.get_offer_specification[e.target.dataset.index].up_money = e.detail.value.replace(/[^\d\.]/g, '');
       break;
       case "money":
        data.get_offer_specification[e.target.dataset.index].money = e.detail.value.replace(/[^\d\.]/g, '');
       break;
       case "remarks":
        data.get_offer_specification[e.target.dataset.index].remarks = e.detail.value;
       break;
     }

   this.setData({
     offerData:data
   })
   
    
  } ,
  handlePicsUpload(e){  ///  处理图片上传
    this.setData({
      imgsList:[{
        url:e.detail.file.url,
        name:'报价单'
      }]
    })

  },
  handleDelPics(){ //   处理点击删除图片
     this.setData({
      imgsList:[]
     })
  },
  _userInfo(data){  //获取 报价人电话 与 报价人姓名
    userInfo(data).then((res)=>{
       if(res.status === 200){
        //  let data = { mobile: res.data.get_supplier_audit_info.mobile, name: res.data.get_supplier_audit_info.nick_name, company: res.data.get_supplier.supplier_name}
        this.setData({
            infoData:res.data
        })
       }else{
        toast(res.message)
       }
    })
  } ,

  _offerInfo(data){   //获取 公司名称 与 材料数量
    offerInfo(data).then((res)=>{

      if(res.status === 200){

        res.data.get_offer_specification.forEach(item => {
          item.up_money = "";
          item.money = "";
          item.remarks = "";
       });

       this.setData({
        offerData:res.data
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
      }else{
        toast(res.message)
      }

    })

  } ,

  onSendForm(){       //点击了提交
   const _this = this;
   let data = this.data.offerData;
   data.material_time = this.data.date;
   let dataChild =  data.get_offer_specification;
    // for(let i = 0; i <dataChild.length;i++){
    //   for(let v in dataChild[i]){
    //     if(!dataChild[i]['up_money'] && !dataChild[i]['money']){
    //       toast('操作失败,请填写材料表信息')
    //       return      
    //     }
    //   }
    // }

    if(!data.material_time) {  toast('操作失败,请填写报价日期'); return}
    if(this.data.imgsList.length < 1) { toast('操作失败,请填上传报价单'); return}

    
 
    let offerData = {
      id:data.id ,
      materialTime:data.material_time ,
      offerSpecification:JSON.stringify(dataChild) ,
    }
    console.log(offerData);
    // return
   

    Dialog.alert({
      title: '操作提醒',
      message: '是否提交报价单信息',
      closeOnClickOverlay:true,
      showCancelButton:true
    }).then(() => {
      _this._uploadFile(offerData)
       
    });
   
  } ,

  _uploadFile(offerData){
    wx.uploadFile({
            url: BASE_URL + '/offerApiToken/offerUpdate', //仅为示例，非真实的接口地址
            filePath: this.data.imgsList[0].url,
            name: 'imageUrl',
            header:{
              'Content-Type':'application/json' ,
              'Authorization':'Bearer ' + wx.getStorageSync("token") || ''
            },
            formData: offerData,
            success (res){    
              let result = JSON.parse(res.data)      
              if(result.status == 200){
                toast(res.message,'success')
                setTimeout(()=>{
                  wx.reLaunch({
                    url: '/pages/supplier/index/index'
                  });
                },1000)
              }else{
                if(result.data.length > 0){
                Toast(result.data.message[0]);
                }else{
                Toast(result.message);
                }
              }
            }
          })
  }

 
})