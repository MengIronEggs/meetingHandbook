import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => require(['../view/Login.vue'], resolve);
const Main = resolve => require(['../view/Main.vue'], resolve);
const MeetingList = resolve => require(['../view/Main/MeetingList.vue'], resolve);
const MeetingEdit = resolve => require(['../view/Main/MeetingEdit.vue'], resolve);
const ArticleEdit = resolve => require(['../view/Main/ArticleEdit.vue'], resolve);
const TripEdit = resolve => require(['../view/Main/TripEdit'], resolve);
const SignDashboard = resolve => require(['../view/Main/SignDashboard'], resolve);

// 行政管理部分
const managementList = resolve => require(['../view/Management/managementList'], resolve);
const managementEdit = resolve => require(['../view/Management/managementEdit'], resolve);
const AdministrationEdit = resolve => require(['../view/Management/AdministrationEdit'], resolve);
const personalmanagement = resolve => require(['../view/Management/Personalmanagement'], resolve);
const adminSetup = resolve => require(['../view/Management/AdminSetup'], resolve);
const aboutUs = resolve => require(['../view/Management/AboutUs'], resolve);
const comprehensiveSearch = resolve => require(['../view/Management/ComprehensiveSearch'], resolve);

// 日报部分

const dailyfirst = resolve => require(['../view/Daily/DailyFirst'], resolve);
const companyDetials = resolve => require(['../view/Daily/companyDetials'], resolve);

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/main',
            component: Main,
            children: [{
                path: '/',
                component: MeetingList
            }, {
                path: 'meeting/edit',
                component: MeetingEdit
            }, {
                path: 'article/edit',
                component: ArticleEdit
            }, {
                path: 'trip/edit',
                component: TripEdit
            }, {
                path: 'signDashboard',
                component: SignDashboard
            }, ]
        }, {
            path: '/login',
            component: Login
        }, {
            path: '*',
            component: Login
        }, {
            path: '/managementList',
            component: managementList
        }, {
            path: '/managementEdit',
            component: managementEdit
        }, {
            path: '/AdministrationEdit',
            component: AdministrationEdit
        },{
            path:'/personalmanagement',
            component: personalmanagement
        },{
            path:'/adminSetup',
            component: adminSetup
        },{
            path:'/aboutUs',
            component: aboutUs
        },{
            path:'/comprehensiveSearch',
            component: comprehensiveSearch
        }
        ,{
            path:'/dailyfirst',
            component: dailyfirst
        },
        {
            path:'/companyDetials',
            component: companyDetials
        },
        
    ]
})