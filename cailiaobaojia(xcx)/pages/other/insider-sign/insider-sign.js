const { sendInsiderLogon } = require("../../../network/home")
const { throttle, toast } = require("../../../utils/Tools")
import Dialog from '../../../components/dialog/dialog';

// pages/other/insider-sign/insider-sign.js
Page({
  data: {
    IDItems: [
      {value: 1, name: '销售员', checked: 'true'},
      {value: 2, name: '内部主管'}
    ],
    idVal:1
  },
  onLoad (options) {
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
      sendInsiderLogon(data).then(res=>{
        if(res.status === 200){
          toast('提交成功','success')
          setTimeout(_=>{
            wx.reLaunch({
              // url: '/pages/insider/approval/approval'
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