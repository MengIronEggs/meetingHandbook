<style>
    .login .el-form-item {
        padding: 0 36px;
    }

    .login .el-input__inner {
        text-indent: 20px;
        height: 50px;
    }

    .publicInput .el-input__icon {
        left: 0;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #f18270;
        border-color: #f18270;
    }
</style>

<style scoped>
    .login {
        min-width: 1000px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: no-repeat center;
        background-size: cover;
        overflow: auto;
        transition: background-image 1s;

    }

    .login > img {
        position: absolute;
        width: 245px;
        height: 85px;
        font-size: 0;
        border: none;
        top: 100px;
        left: 60%;
        margin-left: 40px;
    }

    .login-container {
        position: absolute;
        left: 60%;
        top: 220px;
        margin-bottom: 100px;
        border-radius: 5px;
        box-sizing: border-box;
        background-clip: padding-box;
        width: 340px;
        background: #fff;
        box-shadow: 0 0 25px #100404;
    }

    .ui_icon {
        position: absolute;
        width: 35px;
        height: 100%;
        left: 0;
        top: 0;
        text-align: center;
        z-index: 999;
        color: #bfcbd9;
    }

    .ui_user {
        background: url('../../static/Login/username.png') center no-repeat;
    }

    .ui_password {
        background: url('../../static/Login/password.png') center no-repeat;
    }

    .title {
        margin: 20px auto 20px auto;
        text-align: center;
        color: #f18270;
        font-size: 28px;
    }

    .remember {
        display: block;
        width: 100%;
        text-align: left;
        padding: 0 0 30px 40px;
    }

    .loginBtn {
        background: #f18270;
        color: #fff;
        height: 42px;
        width: 190px;
        margin: 0 auto;
    }

    .messageTitle {
        width: 100%;
        height: 70px;
        background: #56596a;
        color: #aab5ee;
        font-size: 18px;
        text-align: center;
        line-height: 70px;
    }
</style>

<template>
    <div class="login" :style="backgroundImage">
        <img src="../../static/Login/logo.png">
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">

            <!--账号密码登录窗口-->
            <div>
                <h3 class="title">账户登录</h3>
                <el-form-item prop="username">
                    <i class="ui_icon ui_user"></i>
                    <el-input type="text" v-model="form.username" placeholder="账号或手机号：" class="publicInput"/>
                </el-form-item>

                <el-form-item prop="password">
                    <i class="ui_icon ui_password"></i>
                    <el-input type="password" v-model="form.password" placeholder="密码："/>
                </el-form-item>


                <el-checkbox v-model="remember" class="remember">记住账号</el-checkbox>
                <div style="width:100%;text-align:center;margin-bottom:16px;">
                    <el-button class="loginBtn" :loading="loading" @click.native.prevent="submit">登录</el-button>
                </div>
            </div>

            <div class="messageTitle">会议手册</div>
        </el-form>
    </div>
</template>

<script>
    import background1 from "../../static/Login/background_1.jpg";
    import background2 from "../../static/Login/background_2.jpg";

    export default {
        data() {
            return {
                backgroundUrl: background1,

                loading: false,
                form: {
                    username: '',
                    password: '',
                },

                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                },

                changeBackgroundTimer: null,

                remember: true,
            };
        },

        created() {
            //初始化时，若本地记录了登录信息，则默认填充登录信息
            let account = this.$getStorage(this.KEYS.USER_ACCOUNT);
            if (account) {
                let {username, password, remember} = account;
                this.remember = remember;
                if (remember) {
                    this.form.username = username;
                    this.form.password = password;
                }
            }

        },

        beforeDestroy() {
            //移除时需要销毁定时器、取消键盘监听
            clearInterval(this.changeBackgroundTimer);
            document.onkeyup = null;
        },

        mounted() {
            //定时更新背景
            this.changeBackgroundTimer = setInterval(() => {
                if (this.backgroundUrl === background1) {
                    this.backgroundUrl = background2;
                } else {
                    this.backgroundUrl = background1;
                }
            }, 5000);

            //监听回车，点击登录
            document.onkeyup = e => {
                e = e || event;
                let currKey = e.keyCode || e.which || e.charCode;
                if (currKey === 13) {
                    this.submit();
                }
            };
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {

                        this.$post(`login`, {
                            name: this.form.username,
                            password: this.form.password
                        }).then(res => {

                            if(res.Code === 200 && res.Data){

                                this.$setSession(this.KEYS.USER_ID, res.Data.Id);
                                this.$setSession(this.KEYS.USER_INFO, res.Data);

                                if (this.remember) {
                                    this.$setStorage(this.KEYS.USER_ACCOUNT, {
                                        remember: this.remember,
                                        username: this.form.username,
                                        password: this.form.password,
                                    });
                                } else {
                                    this.$setStorage(this.KEYS.USER_ACCOUNT, {
                                        remember: this.remember,
                                    });
                                }
                                this.$router.replace("/main/");
                            }else{
                                this.$showErrorTip("账号密码错误!");
                            }
                        });
                })
            },
        },

        computed: {
            backgroundImage() {
                return {backgroundImage: `url(${this.backgroundUrl})`}
            },
        },
    }

</script>
