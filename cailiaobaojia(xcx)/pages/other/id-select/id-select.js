const app = getApp()
Page({
  data:{
    IDItems: [
      {value: 0, name: '供应商', checked: 'true'},
      {value: 1, name: '项目方'},
      {value: 2, name: '内部人员'}
    ],
    idVal:0,
    idUrl:['/pages/other/supplier-sign/supplier-sign','/pages/other/project-sign/project-sign','/pages/other/insider-sign/insider-sign']
  },
  onShow(){
  },
  ///        函数事件      //
  handleIDSelect(e){  ///   处理点击了选择身份
    this.setData({
      idVal: e.detail.value
    })
  },
  handleSubmit(){   /// 处理点击了提交
    wx.navigateTo({
      url: this.data.idUrl[this.data.idVal]
    });
  }
})