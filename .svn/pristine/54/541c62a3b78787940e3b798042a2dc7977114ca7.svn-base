/**
 * Created by Administrator on 2017/4/10 0010.
 */

//保存所有的广播事件
import {config} from '../config';

export default class {

    constructor() {
        window.EVENT_STORAGE = window.EVENT_STORAGE || {};
    }

    install(Vue, options) {
        this.installExtendsFunction();

        this.installComponent(Vue);

        this.installPrototype(Vue);

        this.installFilter(Vue);

        this.installMixin(Vue);
    }

    /*------------------安装扩展方法------------------*/
    installExtendsFunction() {
        /**
         * 扩展时间对象，增加Format方法
         */
        (function () {
            /*对Date的扩展，将 Date 转化为指定格式的String
             月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
             年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
             例子：
             (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
             (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
             支持时间格式化*/
            Date.prototype.Format = function (fmt) { //author: meizz
                let o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (let k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }());
    }

    /*------------------添加vue组件------------------*/
    installComponent(Vue) {
        /*Vue.component("ga-content-header", ContentHeader);*/
    }

    /*------------------添加vue过滤器------------------*/
    installFilter(Vue) {

    }

    /*------------------添加vue实例方法------------------*/
    installPrototype(Vue) {
        //定义storage里面的key
        Vue.prototype.KEYS = {
            //记录当前登录的用户信息
            USER_INFO: 'USER_INFO',
            USER_ACCOUNT: 'USER_ACCOUNT',
            USER_ID: 'USER_ID',
        };

        //定义全局事件
        Vue.prototype.EVENTS = {
            UPDATE_MENU_ACTIVE: 'UPDATE_MENU_ACTIVE', //页面路由改变时，更新菜单的展开项目
            RELOAD_ARTICLE_TEMPLATE_LIST: 'RELOAD_ARTICLE_TEMPLATE_LIST'  //重新加载文章模版列表
        };

        /**
         * 定义上传图片的地址
         * @type {string}
         */
        Vue.prototype.UPLOAD_IMAGE = config.UPLOAD_IMAGE;
        Vue.prototype.UPLOAD_EDITOR_IMAGE = config.UPLOAD_EDITOR_IMAGE;
        Vue.prototype.UPLOAD_FILE = config.UPLOAD_FILE;
        Vue.prototype.UPLOAD_TRIP = config.UPLOAD_TRIP;

        /**
         * 获取session中的对象
         * @param key
         */
        Vue.prototype.$getSession = key => {
            let value = window.sessionStorage.getItem(key);

            try {
                value = JSON.parse(value);
            } catch (e) {
                console.error(e, key, value);
                return null;
            }

            return value;
        };

        /**
         * 设置、清空session中的对象
         * @param key
         * @param value
         */
        Vue.prototype.$setSession = (key, value) => {
            if (value === undefined) {
                window.sessionStorage.removeItem(key);
            } else {

                if (typeof value === "object") {
                    value = JSON.stringify(value)
                }

                window.sessionStorage.setItem(key, value);
            }
        };

        /**
         * 获取storage中的对象
         * @param key
         */
        Vue.prototype.$getStorage = key => {
            let value = window.localStorage.getItem(key);

            try {
                value = JSON.parse(value);
            } catch (e) {
                console.error(e, key, value);
                return null;
            }

            return value;
        };

        /**
         * 设置、清空Storage中的对象
         * @param key
         * @param value
         */
        Vue.prototype.$setStorage = (key, value) => {
            if (value === undefined) {
                window.localStorage.removeItem(key);
            } else {

                if (typeof value === "object") {
                    value = JSON.stringify(value)
                }

                window.localStorage.setItem(key, value);
            }
        };

        /**
         * get请求
         * @param url
         * @returns {Promise.<TResult>}
         */
        Vue.prototype.$get = function(url) {
            let loadingInstance = this.Loading.service({fullscreen: true,background:'rgba(0,0,0,0.2)'});
            const id = this.$getSession(this.KEYS.USER_ID);
            const headers = {"Content-Type": "application/json"};
            if(id){
                headers.Authorization = `Bearer:${id}`
            }
            return fetch(config.INTERFACE + url, {
                method: 'get',
                headers: headers,
            }).then(function (response) {
                return response.json();
                
            }).then(res => { 
                setTimeout(()=>{
                    loadingInstance.close();
                },500)
               
                console.group(`请求接口：${url}`);
                console.log("响应结果：", JSON.parse(JSON.stringify(res)));
                console.groupEnd();

                if(!res.Code){
                    loadingInstance.close();
                    this.$showErrorTip("登录信息丢失");
                    this.$router.replace(`/login`);
                    return;
                }

                return res;
            }).catch(function (e) {
                loadingInstance.close();
                console.error("接口异常：",e);
                this.$router.replace(`/login`)
            })
        };

        /**
         * post请求
         * @param url
         * @param data
         * @returns {Promise.<TResult>}
         */
        Vue.prototype.$post = function(url, data = {}) {
            let loadingInstance = this.Loading.service({fullscreen: true,background:'rgba(0,0,0,0.2)'});
            let requestUrl = config.INTERFACE + url;

            let body = JSON.stringify(data);

            const id = this.$getSession(this.KEYS.USER_ID);
            const headers = {"Content-Type": "application/json"};
            if(id){
                headers.Authorization = `Bearer:${id}`
            }

            return fetch(requestUrl, {
                method: 'post',
                headers: headers,
                body: body,
            }).then(function (response) {
                return response.json();
            }).then(res => {
                setTimeout(()=>{
                    loadingInstance.close();
                },500)
                console.group(`请求接口：${url}`);
                console.log("请求参数：", data);
                console.log("响应结果：", JSON.parse(JSON.stringify(res)));
                console.groupEnd();

                if(!res.Code){
                    loadingInstance.close();
                    this.$showErrorTip("用户名或密码错误"); //登录信息丢失
                    this.$router.replace(`/login`);
                    return;
                }

                return res;
            }).catch(function (e) {
                loadingInstance.close();
                console.error("接口异常：",e);
                this.$router.replace(`/login`)
            })
        };

        Vue.prototype.$webSocket = function(url){
            return new WebSocket(config.SOCKET + url);
        };

        /**
         * 删除操作时的弹出框
         * 封装element的confirm弹出层
         */
        Vue.prototype.$deleteConfirm = function (cb, msg = "确认删除？") {
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                cb();
            }).catch(() => {

            });
        };

        /**
         * 封装操作的错误提示信息
         * @param msg
         */
        Vue.prototype.$showErrorTip = function (msg) {
            this.$message.error({
                message: msg,
                customClass: 'form-error',
                showClose: true,
                duration: 2000,
            });
        };

        /**
         * 封装展示弹出消息
         * @param msg
         * @param type
         */
        Vue.prototype.$showMsgTip = function (msg, type = 'success') {
            this.$message({
                message: msg,
                type: type,
                customClass: 'form-error',
                showClose: true,
                duration: 2000,
            });
        };

        /**
         * 展示确认操作提示框
         * @param msg
         * @param cb
         * @param type
         */
        Vue.prototype.$showConfirm = function(msg, cb = ()=>{}, type = 'warning'){
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type
            }).then(() => {
                cb();
            }).catch(()=>{
                this.$message({
                    message: "取消操作",
                    type: 'info',
                    customClass: 'form-error',
                    showClose: true,
                    duration: 2000,
                });
            });
        };

        /**
         * 获取展示文件的url
         * @param fileName
         * @param w
         * @param h
         * @returns {string}
         */
        Vue.prototype.$concatFileUrl = (fileName, w, h) => {
            let size = "";
            if (w !== undefined && h !== undefined) {
                size = `/2/w/${w}/h/${h}`;
            }
            return config.IMAGE_PATH + `${fileName}${size}`;
        };

        /**
         * 新增一条订阅记录（用于组件间通信）
         *
         * @param eventName
         * @param owner
         * @param cb
         */
        Vue.prototype.$subscribe = function(eventName, owner, cb) {
            const queue = window.EVENT_STORAGE[eventName] || [];
            const register = window.EVENT_STORAGE.__REGISTER || new WeakMap();

            queue.push({
                _this: this,
                owner: owner,
                cb: cb,
            });

            let eventSet;
            if(register.has(this)){
                eventSet = register.get(this)
            }else {
                eventSet = new Set();
            }
            eventSet.add(eventName);
            register.set(this, eventSet);

            window.EVENT_STORAGE.__REGISTER = register;
            window.EVENT_STORAGE[eventName] = queue;
        };

        /**
         * 订阅者取消订阅消息（用于组件间通信）
         */
        Vue.prototype.$unsubscribe = function(){
            const register = window.EVENT_STORAGE.__REGISTER;
            if(!register){
                return
            }

            const eventSet = register.get(this);
            if(eventSet){
                eventSet.forEach(key => {
                    const queue = window.EVENT_STORAGE[key] || [];
                    window.EVENT_STORAGE[key] = queue.filter(obj => obj._this !== this);
                });

                register.delete(this)
            }
        };

        /**
         * 推送一条全局消息（用于组件间通信）
         *
         * @param eventName
         * @param sender
         * @param parameter
         * @param cb
         */
        Vue.prototype.$broadcast = (eventName, sender, parameter = {}, cb) => {
            let queue = window.EVENT_STORAGE[eventName];
            console.group("广播消息：", eventName);

            if (queue === undefined || queue.length === 0) {
                console.warn(`推送事件：${eventName},不存在订阅者`);
                console.groupEnd();
                return false;
            }

            queue.map(obj => {
                obj.cb(parameter);
                console.log(`推送人：${sender},推送事件：${eventName},参数：${parameter},接收者：${obj.owner}`);
            });

            if (cb) {
                cb();
            }

            console.log(`接收者共：${queue.length}`);
            console.groupEnd();
        };

        /**
         * 下载一个文件
         *
         * @param url
         */
        Vue.prototype.$downloadFile = (url) => {
            //默认在新窗口打开图片
            try {
                window.open(url);
            } catch (e) {
                // //开始下载
                let anchor = document.createElement("a");
                anchor.href = url;
                anchor.setAttribute("download", "");
                anchor.style.display = "none";
                document.body.appendChild(anchor);
                setTimeout(function () {
                    anchor.click();
                    document.body.removeChild(anchor);
                }, 66);
            }


        };

        /**
         * 文件上传拦截
         * @param file
         * @param type :  图片（pic）, 文档(file)
         */
        Vue.prototype.$fileFilter = function (file, type = "pic", size = 0) {
            let name = file.name;
            let arr = [];
            switch (type) {
                case "pic":
                    arr = ['.jpeg', '.jpg', '.png'];
                    break;
                case "file":
                    arr = ['.doc', '.docx', '.xls', '.xlsx', '.pdf', '.jpeg', '.png', '.jpg'];
                    break;
            }
            if (size && file.size / 1024 > size) {
                this.$showErrorTip("上传文件过大,请上传小于300K的图片!");
                return false;
            }

            let ext = name.toLowerCase().split(".")[1];
            if (arr.indexOf(`.${ext}`) !== -1) {
                return true;
            }

            this.$showErrorTip("文件类型错误");
            return false;
        };
    };

    /*------------------安装mixin方法------------------*/
    installMixin(Vue) {
        Vue.mixin({
            beforeDestroy: function() {
                this.$unsubscribe();
            }
        })
    }
};
