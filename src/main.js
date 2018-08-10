// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store';
import VueQrcode from '@xkeshi/vue-qrcode'
import { Loading } from 'element-ui';
import '../src/script/editor';
import '../src/script/spark-md5.min';

Vue.prototype.Loading = Loading;

import BaiduMap from 'vue-baidu-map'

 router.afterEach((to, from) => {
     //debugger;
    // console.log('1',to.path);
    // console.log('2',from.path);
    if (to.path == '/login') {
        if (localStorage.getItem("reload")!=0) {
            localStorage.setItem("reload",0)
            window.location.reload();
        }else{
            localStorage.setItem("reload", 1)
        }
    }
 })
 router.beforeEach((to, from, next) => {
    console.log(to.path,from.path); 
    if (to.path !== '/companyDetials' && to.path !== '/dailyfirst') {
        store.state.attribute.dailyCacheArr.tableIndex=0;
        store.state.attribute.dailyCacheArr.newIndex= 0;
        store.state.attribute.dailyCacheArr.companyContent= null;
        store.state.attribute.dailyCacheArr.secondCompanyContent= null;
        store.state.attribute.dailyCacheArr.secondCompanyArr= [];
        store.state.attribute.dailyCacheArr.secodCompanyKey= null;
        store.state.attribute.dailyCacheArr.newId= null;
    }
    next();
 });
Vue.use(BaiduMap, {
  ak: 'Gphfc3FkrQXVOXSwYnaRcdxR'
})
// import Bus from './script/Bus'
// Vue.use(Bus);
// Vue.prototype.$Bus = Bus;

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 安装swiper组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.component('qrcode', VueQrcode);

//安装自定义组件
import GaPlugin from './script/GaPlugin'

Vue.use(new GaPlugin());

// router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
//   debugger
//     if(to.path =='/dailyfirst' && from.path != '/companyDetials'){
//         // if(form.path != '/companyDetials') {
//             to.meta.keepAlive = false;  // B 跳转到 A 时，让 A 缓存，即不刷新
//         // }
        
//     }
//     next()
// })
//判断是否是生产环境，生产环境下，将console方法重写
if (process.env.NODE_ENV === 'production') {
    window.console.log = () => {};
    window.console.info = () => {};
    // window.console.error = ()=>{};
    window.console.group = () => {};
    window.console.groupEnd = () => {};
    Vue.config.silent = true;
}

// require('../src/script/spark-md5.min');

// Require Froala Editor js file.
require('../static/froala_editor.pkgd.min')
require('froala-editor/js/languages/zh_cn')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'
Vue.use(VueFroala)

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})