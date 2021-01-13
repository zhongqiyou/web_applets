import {BASE_URL} from '../../../network/network'
import { toast, throttle } from '../../../utils/Tools'
import Dialog from '../../../components/dialog/dialog';
Page({
  data:{
    imgsList:[]
  },
  onLoad(){
    this.handleFormSubmit = throttle(this.handleFormSubmit)
  },
  ///       函数事件      //
  handlePicsUpload(e){  ///  处理图片上传
    this.setData({
      imgsList:[{
        url:e.detail.file.url,
        name:'营业执照'
      }]
    })

  },
  handleDelPics(){ //   处理点击删除图片
     this.setData({
      imgsList:[]
     })
  },
  handleFormSubmit(e){  ///  点击了提交
    let data = e.detail.value
    for(let v in data){
      if(!data[v]){
        toast('操作失败,全部选项必填')
        return
      }
    }
    if(this.data.imgsList.length<1) return;
    Dialog.alert({
      title: '操作提醒',
      message: '是否提交注册信息',
      closeOnClickOverlay:true,
      showCancelButton:true
    }).then(() => {
      const {id} = wx.getStorageSync('user');
      Object.assign(data,{userId:id})
      wx.uploadFile({
        url: BASE_URL + '/wechatApiToken/supplierRegistration', //仅为示例，非真实的接口地址
        filePath: this.data.imgsList[0].url,
        name: 'imageUrl',
        header:{
          'Authorization':'Bearer ' + wx.getStorageSync("token") || ''
        },
        formData: data,
        success (res){
          if(JSON.parse(res.data).status == 200){
            console.log("上传成功");
            
            toast(res.message,'success')
            setTimeout(()=>{
              wx.reLaunch({
                // url: '/pages/supplier/index/index'
                url: '/pages/other/warrant/warrant?title="正在审核中..."' //注册完成跳回授权登陆,跳转相应首页
              });
            },1000)
          }else{
            console.log("上传失败");
            
            toast('上传失败!','loading')
          }
        }
      })
    });
  }
})