/**
 * drag.js
 */
import {toast} from '../../utils/Tools'

const app = getApp();
let GlobalData = app.globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position: Object
  },




  attached: function () {
    let safeArea = GlobalData.systemInfo.safeArea || null;
    if (safeArea) {
      this.setData({
        safeArea
      });
    }
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行

  },
  ready: function () {
  //  this.add = debounce(this.add);
  },

  pageLifetimes: {
    show: function () {//组件所在页面onshow
      let safeArea = this.data.safeArea || null;
      this.setData({
        position: null
      });
      
      try {
        let position = wx.getStorageSync('chengchema')
        if (!position) {
          position = {
            right: 0,
            bottom:240  + "rpx"
          }
        }
        this.setData({
          position,
          isShow: true
        });

      } catch (e) {
        // Do something when catch error
      }
    },
    hide: function () {
      //组件所在页面onshow
      this.setData({
        position: null,
        isShow: false
      })
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },

  data: {
    safeArea: null 
  },

  /**
   * 组件的方法列表
   */

  methods: {
    setPosition(position) {
      wx.setStorage({
        key: "chengchema",
        data: position
      })
    } ,
    add(){
      const _this = this;
      wx.requestSubscribeMessage({
        tmplIds: ['Z183c2KqHsYPo9zmCAv-dciQz2oYu6B8Flc8q33GgBY'],
        success (res) { 
          if(res['Z183c2KqHsYPo9zmCAv-dciQz2oYu6B8Flc8q33GgBY'] !== 'accept'){
            toast("你将不能收到审核信息相关通知");
            return
            }
          _this.setData({
            show:true
          })
          _this.setData({
            show:false
          })
        } ,
        fail(){
          toast("太过于频繁! 稍后 , 请重试!");
        }
      })
      
    }
  }
})