<style scoped>
    .page {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding-right: 20px;
        max-width: 600px;
        min-width: 250px;
        height: 500px;
    }

    .box-card{
        overflow: auto;
    }

    .article-item {
        font-size: 14px;
        padding: 10px 0;
        color: #333;
        position: relative;
    }

    .article-item:hover {
        color: #409EFF;
    }

    .btn-add {
        margin: 10px auto 0 auto;
        display: block;
    }

    .copy-btn {
        color: #409EFF;
        display: none;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        text-decoration: underline;
    }

    .article-item:hover .copy-btn {
        display: inline-block;
    }
</style>

<template>
    <div class="page">
        <h4>文章列表</h4>

        <!--基本属性-->
        <el-card class="box-card">
            <div v-for="item in articleList" :key="item.id">
                <div class="article-item">
                    <router-link :to="`/main/article/edit?mid=${mid}&aid=${item.id}`">
                        <p>{{item.title}}</p>
                    </router-link>

                    <span class="copy-btn btn" :data-clipboard-text="`#/article?id=${item.id}`">复制</span>
                </div>
            </div>

            <router-link :to="`/main/article/edit?mid=${mid}`">
                <el-button class="btn-add" type="primary" size="mini" icon="el-icon-plus" circle></el-button>
            </router-link>
        </el-card>
    </div>
</template>

<script>
    import Clipboard from 'clipboard';

    export default {
        data() {
            return {
                mid: this.$route.query.mid
            }
        },

        created() {
            this.$get(`HandBookDetailList?pid=${this.mid}`).then(res => {
                const {Data} = res;
                const articleList = Data.map(item => {
                    return {
                        title: item.Pagename,
                        id: item.Id,
                    }
                });

                this.$store.commit("initArticleList", {
                    articleList
                });
            })
        },

        mounted() {
            const clipboard = new Clipboard('.btn');
            clipboard.on('success', (e) => {
                this.$showMsgTip("复制成功")
            });
        },

        methods: {},

        components: {},

        computed: {
            articleList() {
                return this.$store.state.attribute.articleList;
            },
        }
    }
</script>
