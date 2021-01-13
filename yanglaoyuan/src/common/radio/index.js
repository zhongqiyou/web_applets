import MyRadio from './radioCancelable.vue'
// 这里是重点
const  KRadio = {
    install: function(Vue){
        Vue.component('KRadio',MyRadio)
    }
}

// 导出组件
export default KRadio