import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// rem
import 'amfe-flexible';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// vue-i18n  语言转换
import VueI18n from 'vue-i18n';
import zh from './common/lang/zh';
import en from './common/lang/en';
import jp from './common/lang/jp';
import id from './common/lang/in';
import jaIVive from 'view-design/dist/locale/ja-JP';
import zhIVive from 'view-design/dist/locale/zh-CN';
import enIVive from 'view-design/dist/locale/en-US';
import idIVive from 'view-design/dist/locale/id-ID';
import KRadio from './common/radio'
Vue.locale = () => { };

Vue.use(VueI18n);

Vue.use(ViewUI, {
    i18n: function (path, options) {
        let value = i18n.t(path, options)
        if (value !== null && value !== undefined) {
            return value
        }
        return ''
    }
})

Vue.use(KRadio);

Vue.config.productionTip = false

Vue.prototype.BASE_URL = 'http://47.115.137.147:9000/'

// 挂载全局跳转路由的方法
Vue.prototype.goTo = function (url, payload = '') {
    let item = {};
    for (let i in router.options.routes) {
        let checkurl = url.split('?')[0];
        if (router.options.routes[i].path == checkurl) {
            item = router.options.routes[i];
        }
    }

    if (url == '') {
        return;
    }
    App.methods.recordRouter(item);
    router.push({
        path: url
    });
    if (payload) localStorage.setItem('oldInfo', JSON.stringify(payload))
    if (payload) localStorage.setItem('unitId', payload.unitId)
}

Vue.prototype.levelCate = ['陪护', '看护', '医生', '物理治疗师', '营养师', '相谈员', '护理经理','康复师']

console.log('main语言重新加载', sessionStorage.getItem('language'));
// 实例化i18n
const i18n = new VueI18n({
    locale: sessionStorage.getItem('language') || 'ja', // 语言标识
    silentTranslationWarn: true,
    messages: {
        'zh': Object.assign(zh, zhIVive),
        'en': Object.assign(en, enIVive),
        'ja': Object.assign(jp, jaIVive),
        'id': Object.assign(id, idIVive)
    }
})

new Vue({
    router,
    store,
    i18n,
    el: '#app',
    i18n: i18n,
    render: h => h(App)
}).$mount('#app')