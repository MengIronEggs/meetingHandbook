<style scoped>
    .page {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        max-width: 600px;
        min-width: 250px;
        height: 500px;
    }

    .el-card{
        overflow: auto;
    }

    .template-group{
        border-bottom: 1px dotted #ccc;
        padding-bottom: 10px;
    }

    .template-item {
        font-size: 14px;
        padding: 15px 0 10px 0;
        color: #333;
        position: relative;
        cursor: pointer;
    }

    .template-item:hover {
        color: #409EFF;
    }

    .action-group{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 14px;
        padding-top: 5px;
    }

    .action-btn{
        cursor: pointer;
    }

    .rename-btn{
        color: #E6A23C;
    }

    .remove-btn{
        color: #F56C6C;
    }
</style>

<template>
    <div class="page">

        <el-input
            placeholder="请输入模板名称"
            v-model="search"
            @input="getList"
        >
        </el-input>

        <el-card>
            <div v-for="item in templateList" :key="item.id">
                <div class="template-group">
                    <p class="template-item" @click="add(item.id)">{{item.title}}</p>

                    <div class="action-group">
                        <span class="action-btn rename-btn" @click="renamePop(item)">
                           重命名
                        </span>
                        <span class="action-btn remove-btn" @click="remove(item.id)">
                            删除
                        </span>
                        <span>
                            共享
                            <el-switch
                                v-model="item.public"
                                @change="(val)=> publish(item.id, val)"
                            >
                        </el-switch>
                    </span>
                    </div>
                </div>
            </div>
        </el-card>

        <!--重命名弹出框-->
        <el-dialog
            title="另存为模板"
            :visible.sync="renameVisible"
            width="30%"
        >

            <el-form label-width="80px">
                <el-form-item label="模板名称">
                    <el-input
                        class="add-input"
                        placeholder="请输入模板名称"
                        v-model="templateName"
                    >
                    </el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="rename" :disabled="!templateName">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
                templateList: [],

                renameVisible: false,
                templateName: "",
                templateId: "",
            }
        },

        created() {
            this.getList();
            this.$subscribe(this.EVENTS.RELOAD_ARTICLE_TEMPLATE_LIST, `ArticleTemplateSelf`, this.getList);
        },

        mounted() {

        },

        methods: {
            getList(){
                this.$get(`HtmlTempList?myself=1&param=${this.search}`).then(res => {
                    const {Data} = res;
                    this.templateList = Data.map(item => {
                        return {
                            title: item.Tempname,
                            id: item.Id,
                            public: !!item.Shared,
                        }
                    });
                })
            },

            //插入模板
            async add(id){
                let content = await this.$get(`HtmlTempById?id=${id}`).then(res=>{
                    return res.Data.Hbhtmltemp;
                });
                this.$emit("insertTemplate", content);
            },

            renamePop({title, id}){
                this.templateName = title;
                this.templateId = id;
                this.renameVisible = true;
            },

            async rename(){
                const res = await this.$get(`HtmlTempRename?name=${this.templateName}&id=${this.templateId}`);

                if(res.Data){
                    this.$showMsgTip("操作成功");
                    this.getList();
                    this.renameVisible = false;
                }else {
                    this.$showMsgTip("该模版名称已存在", "error");
                }
            },

            remove(id) {
                this.$deleteConfirm(async () => {
                    await this.$get(`HtmlTempDel?id=${id}`);
                    this.getList();
                })
            },

            async publish(id, val) {
                await this.$get(`HtmlTempShare?shared=${val ? 1 : 0}&id=${id}`);
                this.$showMsgTip("操作成功");
            },
        },

        components: {},

        computed: {

        }
    }
</script>
