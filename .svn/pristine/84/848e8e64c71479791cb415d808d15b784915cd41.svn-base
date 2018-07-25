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

    .content{
        height: 100%;
    }
    .logout{

    }
</style>

<template>
    <div class="site-body">
        <header class="site-header">
            <router-link to="/main">
                <img class="logo" src="../../static/Main/logo.png">
            </router-link>
            <span v-show="showTopExit"  class="logout" @click="logout">退出</span>
            <span v-show="showTopExit"  class="logout" @click="changePasswd">修改密码</span>
            <span v-show="showTopExit" class="logout">部门:{{Infomation.company}}</span>
            <span v-show="showTopExit" class="logout">姓名:{{Infomation.name}}</span>
            <span class="timer">{{sysDate}}</span>
        </header>

        <router-view class="content"/>
         <el-dialog
            title="修改密码"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <el-form label-position="right" label-width="80px" :model="userInfo">
            <el-form-item label="用户名">
                <el-input disabled v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="旧密码">
                <el-input v-model="userInfo.password"></el-input>
            </el-form-item>
            <el-form-item 
                label="新密码">
                <el-input type="password" v-model="newPasswd"></el-input>
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmChangePasswd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                clockTimer: null,
                sysDate: '',
                userInfo: {},
                newPasswd: '', // 新密码
                centerDialogVisible: false, // 弹出框
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
                this.$store.state.attribute.isShowExit = false;
                this.$router.push("/login");
            },
            changePasswd() {
                const userid = sessionStorage.getItem('USER_ID')
                if(userid) {
                    this.$get(`GetYunUserFirst?cond=id&arg=${userid}`).then(res => {
                    // console.log(res, 7777)
                    if(res && res.Code === 200 && res.Data) {
                        this.userInfo = res.Data
                        this.centerDialogVisible = true
                    }
                    })
                }else{
                    return false
                } 
            },
            confirmChangePasswd() {
            if(this.newPasswd === '') {
                this.$message({
                message: '请输入密码',
                type: 'warning'
                });
                return false
            }
            console.log(this.userInfo.password)
            this.userInfo.password = this.newPasswd
            this.newPasswd = '';
            this.$confirm('确认修改？')
            .then(_ => {
                this.$post(`YunUserSave`, this.userInfo).then(res => {
                    if(res && res.Code === 200) {
                        this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                        });
                        this.centerDialogVisible = false
                    }
                })
            })
            }
        },

        components: {},
        computed:{
            showTopExit(){
                if(window.sessionStorage.getItem('USER_ID')){
                    this.$store.state.attribute.isShowExit = true;
                }
                return  this.$store.state.attribute.isShowExit;
            },
            Infomation(){
               if(this.$route.path !== '/' && this.$route.path !== '/login' ){
                    let userInfo = JSON.parse(window.sessionStorage.getItem("USER_INFO"));
                    return userInfo;
                }else{
                    let obj = {};
                    obj.name = '';
                    obj.company = '';
                    return obj;
                }
            }
        }
        
    }
</script>
