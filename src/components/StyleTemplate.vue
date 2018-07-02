<style scoped>
    .page {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        max-width: 600px;
        min-width: 250px;
        height: 500px;
        overflow: auto;
    }

    .template-item {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .item-body {
        font-size: 14px;
        flex-grow: 1;
        padding-right: 10px;
    }

    .insert-btn {
        color: #409EFF;
        cursor: pointer;
        text-decoration: underline;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

<template>
    <div class="page">

        <!--特殊样式组件-->
        <!--组件 1-->
        <div class="template-item">
            <div class="item-body">
                <span style="display: inline-block;background: #eee; line-height: 100%;">
                    <span style="float: left; background: red; min-width: 20px;padding: 5px;">序号&nbsp;</span>
                    <span style="float: left; padding:5px 50px 5px 5px;">标题</span>
                </span>
            </div>

            <div class="insert-btn" @click="add">添加</div>
        </div>
        <!--组件 1 结束-->

        <!--组件 2-->
        <div class="template-item">
            <div class="item-body">
                <div style="background: rgb(255, 179, 192);padding: 5px 10px;margin: 5px 0;">
                    <span style="">标题</span>
                </div>
            </div>

            <div class="insert-btn" @click="add">添加</div>
        </div>
        <!--组件 2 结束-->

    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        created() {

        },

        mounted() {

        },

        methods: {
            add(e) {
                this.$emit("insertStyle", e.target.previousElementSibling.innerHTML)
            }
        },

        components: {}
    }
</script>
