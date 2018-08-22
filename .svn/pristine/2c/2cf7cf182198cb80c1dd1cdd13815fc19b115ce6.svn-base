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
        right: -250px;
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
                    <i class="back-btn el-icon-arrow-left" @click="iframeGoBack"></i>
                    预览
                </nav>

                <iframe id="preview" v-if="preview" class="webview" :src="`https://mt.guoanfamily.com/handbookwap/${url}`" scrolling="no"
                        frameborder="0" width="262px" height="424px"></iframe>

                <div class="qrcode">
                    <qrcode :value="`https://mt.guoanfamily.com/handbookwap/${reallyUrl}`" :options="{ size: 150 }"></qrcode>
                    <el-alert
                        title="扫描二维码在手机上预览"
                        type="info"
                        show-icon
                        :closable="false"
                    >
                    </el-alert>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import iphoneImage from '../../static/Main/iphone.png';

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
            }
        },

        created() {

        },

        mounted() {

        },

        methods: {
            close(done) {
                this.$emit(`close`);
                done();
            },

            iframeGoBack(){
                try{
                   
                    if(!frames[0].location.hash.includes(this.url)){
                        history.go(-1);
                    }
                }catch (e) {
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
