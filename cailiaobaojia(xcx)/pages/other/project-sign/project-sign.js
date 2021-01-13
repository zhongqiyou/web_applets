import Dialog from '../../../components/dialog/dialog';
import { sendProjectLogon } from '../../../network/home'
import { toast, throttle } from '../../../utils/Tools'
Page({
  data:{
    IDItems: [
      {value: 1, name: '材料员', checked: 'true'},
      // {value: 2, name: '项目主管'}
    ],
    idVal:1
  },
  onLoad(){
    this.handleSubmit = throttle(this.handleSubmit)
  },
  ///        函数事件      //
  handleIDSelect(e){  ///   处理点击了选择身份
    this.setData({
      idVal:e.detail.value
    })
  },
  handleSubmit(e){   /// 处理点击了提交
    let data = e.detail.value
    for(let v in data){
      if(!data[v]){
        toast('操作失败,全部选项必填')
        return
      }
    }
    Dialog.alert({
      title: '操作提醒',
      message: '是否提交注册信息',
      closeOnClickOverlay:true,
      showCancelButton:true
    }).then(() => {
      const {id} = wx.getStorageSync('user');
      Object.assign(data,{userId:id,i:this.data.idVal})
      sendProjectLogon(data).then(res=>{
        if(res.status === 200){
          toast('提交成功','success')
          setTimeout(_=>{
            wx.reLaunch({
              // url: '/pages/project/offer-order/offer-order'
              url: '/pages/other/warrant/warrant?title="正在审核中..."' //注册完成跳回授权登陆,跳转相应首页
            });
          },1000)
        }else{
          toast('上传失败!','loading')
        }
      })
    });
  }
})