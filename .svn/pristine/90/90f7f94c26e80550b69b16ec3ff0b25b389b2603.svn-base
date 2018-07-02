<style scoped>
    .site-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    .site-header {
        height: 60px;
        line-height: 60px;
        background: #3e3f41;
        text-align: left;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 9;
    }

    .logo {
        height: 36px;
        margin: 12px 10px 12px 90px;
        cursor: pointer;
    }

    .timer{
        color: white;
        line-height: 60px;
        display: inline-block;
        float: right;
        margin-right: 80px;
        font-size: 14px;
    }

    .logout{
        color: white;
        line-height: 60px;
        display: inline-block;
        float: right;
        margin-right: 40px;
        font-size: 14px;
        cursor: pointer;
    }

    .content{
        margin-top: 60px;
        height: 100%;
    }
</style>

<template>
    <div class="site-body">
        <header class="site-header">
            <router-link to="/main">
                <img class="logo" src="../../static/Main/logo.png">
            </router-link>


            <span class="logout" @click="logout">退出</span>
            <span class="timer">{{sysDate}}</span>
        </header>

        <router-view class="content"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clockTimer: null,
                sysDate: '',
            }
        },

        created() {
            //设置定时器，每一秒更新一次时间
            this.sysDate = new Date().Format(`yyyy-MM-dd  ${this.week()}  hh:mm:ss`);
            this.clockTimer = setInterval(() => {
                this.sysDate = new Date().Format(`yyyy-MM-dd  ${this.week()}  hh:mm:ss`);
            }, 1000);
        },

        beforeDestroy(){
            clearInterval(this.clockTimer);
        },

        mounted() {

        },

        methods: {
            week() {
                let day = new Date().getDay();
                let str = "星期";

                switch (day){
                    case 0:
                        str += "日";
                        break;
                    case 1:
                        str += "一";
                        break;
                    case 2:
                        str += "二";
                        break;
                    case 3:
                        str += "三";
                        break;
                    case 4:
                        str += "四";
                        break;
                    case 5:
                        str += "五";
                        break;
                    case 6:
                        str += "六";
                        break;
                }

                return str;
            },

            logout(){
                window.sessionStorage.clear();
                this.$router.push("/login");
            }
        },

        components: {}
    }
</script>
