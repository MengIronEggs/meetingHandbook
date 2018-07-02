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

    .template-item {
        font-size: 14px;
        padding: 10px 0;
        color: #333;
        position: relative;
        cursor: pointer;
        border-bottom: 1px dotted #ccc;
        overflow: hidden;
    }

    .template-item:hover {
        color: #409EFF;
    }

   .auth{
       float: right;
       font-size: 12px;
       color: #999;
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
                <div class="template-item" @click="add(item.id)">
                    <p>{{item.title}}</p>
                    <span v-if="item.auth" class="auth">(作者：{{item.auth}})</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',
                templateList: [],
            }
        },

        created() {
            this.getList();
            this.$subscribe(this.EVENTS.RELOAD_ARTICLE_TEMPLATE_LIST, `ArticleTemplatePublic`, this.getList);
        },

        destroyed(){

        },

        mounted() {

        },

        methods: {
            getList(){
                this.$get(`HtmlTempList?myself=0&param=${this.search}`).then(res => {
                    const {Data} = res;
                    this.templateList = Data.map(item => {
                        return {
                            title: item.Tempname,
                            id: item.Id,
                            auth: item.Createname,
                        };
                    });
                });
            },

            //插入模板
            async add(id){
                let content = await this.$get(`HtmlTempById?id=${id}`).then(res=>{
                    return res.Data.Hbhtmltemp;
                });
                this.$emit("insertTemplate", content);
            }
        },

        components: {},

        computed: {

        }
    }
</script>
