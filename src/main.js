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
import '../src/script/editor'
Vue.prototype.Loading = Loading;

import BaiduMap from 'vue-baidu-map'

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

//判断是否是生产环境，生产环境下，将console方法重写
if (process.env.NODE_ENV === 'production') {
    window.console.log = () => {};
    window.console.info = () => {};
    // window.console.error = ()=>{};
    window.console.group = () => {};
    window.console.groupEnd = () => {};
    Vue.config.silent = true;
}

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