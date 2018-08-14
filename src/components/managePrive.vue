<style>
    .preview-component .el-dialog {
        background: transparent;
        border: none;
        box-shadow: none;
    }

    .preview-component .el-dialog__header {
        display: none;
    }
</style>

<style scoped>
    .iphone-box {
        height: 750px;
        width: 370px;
        margin: 0 auto;
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;
    }

    .webview {
        position: absolute;
        top: 145px;
        left: 27px;
        width: 315px;
        height: 504px;
    }

    .navigation{
        position: absolute;
        top: 110px;
        width: 315px;
        left: 27px;
        height: 35px;
        background: #ff5073;
        text-align: center;
        color: #fff;
        line-height: 35px;
    }

    .back-btn{
        position: absolute;
        left: 10px;
        font-size: 24px;
        top: 5px;
        cursor: pointer;
    }

    .qrcode{
        position: absolute;
        top: 200px;
        right: -325px;
        text-align: center;
    }
</style>

<template>
    <div class="preview-component">
        <el-dialog
            :visible.sync="preview"
            width="50%"
            :before-close="close"
        >
            <div class="iphone-box" :style="{backgroundImage: `url(${iphoneImage})`}">

                <nav class="navigation">
                    <i class="back-btn el-icon-arrow-left" @click="iframeGoBack1"></i>
                   {{title}}
                </nav>

                <iframe ref="previewIframe" v-if="preview" class="webview" :src="`https://mt.guoanfamily.com/${url}`" scrolling="no"
                        frameborder="0" width="262px" height="424px"></iframe>

                <div class="qrcode">
                    <qrcode :value="`https://mt.guoanfamily.com/${reallyUrl}`" :options="{ size: 150 }"></qrcode>
                    <el-alert
                        title="扫描二维码在手机上预览"
                        type="info"
                        show-icon
                        :closable="false"
                    >
                    </el-alert>
                    <label>访问地址: </label>
                    <el-input readonly :value="`https://mt.guoanfamily.com/${reallyUrl}`">
                        <template slot="append">
                            <i class="el-icon-document clip-btn"
                            :data-clipboard-text="`https://mt.guoanfamily.com/${reallyUrl}`"></i>
                        </template>
                    </el-input>
                </div>
                
                
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import iphoneImage from '../../static/Main/iphone.png';
    import Clipboard from 'clipboard';
    export default {

        props: {
            previewDialogVisible: {
                default: false,
            },

            url: {
                default: '',
            }
        },

        data() {
            return {
                iphoneImage: iphoneImage,
                preview: false,
                title:'',
            }
        },

        created() {

        },

        mounted() {
            const clipboard2 = new Clipboard('.clip-btn');
            clipboard2.on('success', (e) => {
                this.$showMsgTip("复制成功")
            });
            if(this.url == 'manageMentwap/#/DailyList'){
                this.title = '日报管理';
            }else{
                this.title ='行政综合'
            }
        },

        methods: {
            close(done) {
                this.$emit(`close`);
                done();
            },
            iframeGoBack1(){
                // var iframeWindow = document.getElementById('preview').contentWindow;
                var iframeWindow = this.$refs.previewIframe.contentWindow;
                var currentHref = iframeWindow.document.location.href;
                // alert('123' +  '   ' + currentHref)
                // if(currentHref.includes('manageMentwap/#/DailyList') || currentHref.includes('manageMentwap/#/')){
                //     this.$emit('refreshList');
                // }else{
                //     history.go(-1);
                // }
                if(
                   currentHref =='https://mt.guoanfamily.com/manageMentwap/#/DailyList' ||
                   currentHref =='https://mt.guoanfamily.com/manageMentwap/#/' || 
                   currentHref == 'https://mt.guoanfamily.com/manageMentwap/#/Login' 
                ){
                    this.$emit('refreshList');
                }else{
                    history.go(-1);
                }
            }
        },

        watch: {
            previewDialogVisible() {
                this.preview = this.previewDialogVisible;
            }
        },

        computed: {
            reallyUrl(){
                return this.url.replace(/&uid=\d*/, "");
            }
        },

        components: {
        },
    }
</script>
