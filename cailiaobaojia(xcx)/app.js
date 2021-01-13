//app.js
App({
  onLaunch: function () {
    
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res
      }
    })

    const user = wx.getStorageSync('user');
    // if(user.audit == 2 || user.identity == 1){
    //   wx.reLaunch({
    //     url: this.globalData.idUrl[user.identity]
    //   });
    // }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  handleNavChange(e){  //  tabbar跳转
    const {path} = e.detail.item
    wx.reLaunch({
      url: path
    });
  },
  globalData: {
    systemInfo:null ,
    userInfo: null,
    isIPhone:'',
    idUrl:['/pages/other/id-select/id-select','/pages/supplier/index/index', "null" , '/pages/documenter/mine-report/mine-report' ,"/pages/project/offer-order/offer-order" ,'/pages/insider/approval/approval'],
    supplierNav: [
      {
        "text": "报价",
        "iconPath": "/assets/icon/offer.png",
        "selectedIconPath": "/assets/icon/offer-on.png",//未注册 //供应商首页  //项目方-资料员首页  // 项目方主管与内部资料员首页   //内部主管首页 
        "path":"/pages/supplier/index/index"
      },
      {
        "text": "我的报价",
        "iconPath": "/assets/icon/mine.png",
        "selectedIconPath": "/assets/icon/mine-on.png",
        "path":"/pages/supplier/mine/mine"
      }
    ]
  } ,


  globalData2: {
    isIPhone:'',
    supplierNav: [
      {
        "text": "我的报料",
        "iconPath": "/assets/icon/myreport.png",
        "selectedIconPath": "/assets/icon/myreport-on.png",
        "path":"/pages/documenter/mine-report/mine-report"
      },
      {
        "text": "新增报料",
        "iconPath": "/assets/icon/add.png",
        "selectedIconPath": "/assets/icon/add-on.png",
        "path":"/pages/documenter/report-add/report-add"
      }
    ]
  } ,

  globalData3: {
    isIPhone:'',
    supplierNav: [
      {
        "text": "审批",
        "iconPath": "/assets/icon/approval.png",
        "selectedIconPath": "/assets/icon/approval-on.png",
        "path":"/pages/insider/approval/approval"
      },
      {
        "text": "报料汇总",
        "iconPath": "/assets/icon/report.png",
        "selectedIconPath": "/assets/icon/report-on.png",
        "path":"/pages/insider/approval-total/approval-total"
      } ,
      {
        "text": "报价汇总",
        "iconPath": "/assets/icon/total.png",
        "selectedIconPath": "/assets/icon/total-on.png",
        "path":"/pages/insider/offer-total/offer-total"
      }
    ]
  }
})