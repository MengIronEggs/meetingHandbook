<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .tab-aside {
        flex-grow: 1;
        width: 320px;
        padding-right: 20px;
    }

    .article-list{
        height: 500px;
        overflow: auto;
    }

    .article-item {
        padding: 5px 0;
        text-align: left;
        font-size: 14px;
        color: #333;
        position: relative;
    }

    .link-btn {
        color: #333;
        cursor: pointer;
    }

    .link-btn:hover {
        color: #409EFF;
    }

    .link-btn.active {
        color: #409EFF;
    }

    .insert-btn, .copy-btn {
        color: #409EFF;
        display: none;
        position: absolute;
        right: 10px;
        cursor: pointer;
        text-decoration: underline;
    }

    .copy-btn {
        right: 50px;
    }

    .article-item:hover .insert-btn {
        display: inline-block;
    }

    .article-item:hover .copy-btn {
        display: inline-block;
    }

    .footer {
        padding: 10px 0;
        width: 100%;
        text-align: center;
    }

    .footer .el-button {
        width: 150px;
    }

    .form-box {
        width: 400px;
        margin: 30px auto;
        border: 1px solid #ccc;
        padding: 20px;
    }

    .btn-add {
        display: block;
        margin: 10px auto;
    }
</style>

<style>
    a[href="https://www.froala.com/wysiwyg-editor?k=u"] {
        display: none !important;
    }
</style>

<template>
    <div>
        <div class="container">
            <div class="tab-aside">
                <el-tabs v-model="activeName" class="tab-aside">
                    <el-tab-pane label="样式" name="style">
                        <styleTemplate @insertStyle="insertStyle"/>
                    </el-tab-pane>

                    <el-tab-pane label="文章" name="article">
                        <div class="article-list">
                            <div v-for="item in articleList" :key="item.id" class="article-item">
                                <span class="link-btn" :class="{active: item.id === aid}" @click="link(item.id)">{{item.title}}</span>

                                <span class="copy-btn btn" :data-clipboard-text="`#/article?id=${item.id}`">复制</span>
                                <span class="insert-btn" @click="insertArticle(item.id, item.title)">插入</span>
                            </div>

                            <el-button class="btn-add" type="primary" size="mini" icon="el-icon-plus" circle
                                       @click="addNew"></el-button>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="私人模板" name="self-template">
                        <articleTemplateSelf v-if="activeName === 'self-template'" @insertTemplate="insertTemplate"/>
                    </el-tab-pane>

                    <el-tab-pane label="公共模板" name="public-template">
                        <articleTemplatePublic v-if="activeName === 'public-template'" @insertTemplate="insertTemplate"/>
                    </el-tab-pane>
                </el-tabs>
            </div>

            <div>
                <div style="margin-bottom: 10px;">
                    <el-input v-model="form.name" placeholder="请输入标题"></el-input>
                </div>

                <froala class="editor-box" v-if="config" :tag="'textarea'" :config="config" v-model="model"></froala>

                <footer class="footer">
                    <el-button type="success" :disabled="!aid" @click="previewDialogVisible = true">预览</el-button>
                    <el-button type="primary" @click="submit" :disabled="!form.name">保存</el-button>
                    <el-button type="warn" @click="addTemplateDialogVisible = true" :disabled="!model">保存为模板</el-button>
                    <el-button type="danger" @click="remove" v-show="aid">删除</el-button>
                    <el-button type="info" @click="goback">返回</el-button>
                </footer>
            </div>

        </div>

        <!--另存为模板提示框-->
        <el-dialog
            title="另存为模板"
            :visible.sync="addTemplateDialogVisible"
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

           <p style="color: #f56c6c; font-size: 12px">* 相同名称的模板会被覆盖</p>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveAsTemplate" :disabled="!templateName">确 定</el-button>
            </span>
        </el-dialog>

        <!--预览提示框-->
        <preview :previewDialogVisible="previewDialogVisible" :url="previewUrl" @close="previewDialogVisible = false"/>
    </div>
</template>

<script>
    import preview from '../../components/Preview'
    import styleTemplate from '../../components/StyleTemplate';
    import articleTemplateSelf from '../../components/ArticleTemplateSelf';
    import articleTemplatePublic from '../../components/ArticleTemplatePublic';

    import Clipboard from 'clipboard';

    export default {
        data() {
            const UPLOAD_EDITOR_IMAGE = this.UPLOAD_EDITOR_IMAGE;

            return {
                aid: this.$route.query.aid,
                mid: this.$route.query.mid,

                activeName: 'style',

                $editor: null,

                config: {
                    placeholder: "",
                    language: "zh_cn",
                    heightMin: 480,
                    widthMin: 800,
                    height: 480,
                    width: '100%',
                    direction: 'ltr',
                    toolbarButtons: ['html', 'fullscreen', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|',
                        'quote', 'insertHR', 'subscript', 'superscript', 'undo', 'redo', '|', 'bold', 'italic',
                        'underline', 'strikeThrough', '|', 'fontFamily', '|', 'fontSize', '|', 'color', 'emoticons',
                        'inlineStyle', '|', 'paragraphFormat', '|', 'paragraphStyle', 'align', 'formatOL', 'formatUL',
                        'outdent', 'indent', 'clearFormatting', 'insertimg', 'lineHeight'],
                    allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
                    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
                    imageUploadURL: UPLOAD_EDITOR_IMAGE,
                    videoUploadURL: UPLOAD_EDITOR_IMAGE,
                    events: {
                        'froalaEditor.initialized': (e, editor) => {
                            this.$editor = editor;
                        }
                    }
                },

                model: null,

                previewDialogVisible: false,

                form: {
                    name: '',
                },

                templateName: '',
                addTemplateDialogVisible: false,
            }
        },

        created() {
            this.extendEditor();
            this.initDetail();
            this.initArticleList();
        },

        mounted() {
            const clipboard = new Clipboard('.btn');
            clipboard.on('success', (e) => {
                this.$showMsgTip("复制成功")
            });
        },

        methods: {
            //扩展编辑器功能
            extendEditor() {
                $.FroalaEditor.DefineIcon('lineHeight', {NAME: 'arrows-v'});
                $.FroalaEditor.RegisterCommand('lineHeight', {
                    title: '设置行高',
                    focus: true,
                    undo: true,
                    type: 'dropdown',
                    refreshAfterCallback: true,
                    options: (function () {
                        const options = {};
                        for (let i = 12; i <= 80; i = i + 2) {
                            options[`${i}`] = `${i}`
                        }
                        return options;
                    })(),
                    callback: function (cmd, val) {
                        let selected = this.html.getSelected();
                        if (selected) {
                            selected = selected.replace(/line-height:\s?\d+px;/g, "");
                            selected = selected.replace(/<\/?span[\s]*[style=""]*>/g, "");
                            this.html.insert(`<span style="line-height: ${val}px">${selected}</span>`);
                        }
                    },
                });
            },

            initDetail() {
                if (this.aid) {
                    this.$get(`HandBookDetailbyId?id=${this.aid}`).then(res => {
                        if (res.Code === 200) {
                            const {Pagename, Pagedetail} = res.Data;
                            this.form.name = Pagename;
                            this.model = Pagedetail;
                        }
                    })
                } else {
                    this.form.name = "";
                    this.model = "";
                }
            },

            initArticleList() {
                return this.$get(`HandBookDetailList?pid=${this.mid}`).then(res => {
                    const {Data} = res;
                    const articleList = Data.map(item => {
                        return {
                            title: item.Pagename,
                            id: item.Id,
                        }
                    });

                    this.$store.commit("initArticleList", {
                        articleList,
                    });
                });
            },

            submit() {
                let contentHTML = this.model;
                if($("button[data-cmd='html']")[0].className.includes("fr-active")){
                    contentHTML = $(".fr-code")[0].value
                }

                if (!this.form.name) {
                    this.$showErrorTip("请输入文章标题");
                    return;
                }

                this.$post(`SaveHandBookDetail`, {
                    Id: this.aid ? ~~this.aid : 0,
                    Pid: ~~this.mid,
                    Pagename: this.form.name,
                    Pagedetail: contentHTML,
                }).then(res => {
                    if (res.Code === 200) {
                        this.$showMsgTip(`保存成功`);
                        this.link(res.Data, false);
                    } else {
                        this.$showErrorTip(`保存失败`);
                    }
                });
            },

            remove() {
                this.$deleteConfirm(() => {
                    this.$get(`HandBookDetailDel?id=${this.aid}`).then(res => {
                        if (res.Code === 200) {
                            this.initArticleList().then(() => {
                                if (this.articleList.length === 0) {
                                    this.$router.go(-1);
                                } else {
                                    this.link(this.articleList[0].id, false);
                                }
                            });
                        } else {
                            this.$showErrorTip(`删除失败`);
                        }
                    });
                });
            },

            goback() {
                this.$showConfirm("确定已保存数据，以免数据丢失", () => {
                    this.$router.back()
                });
            },

            async link(aid, confirm = true) {
                if (aid === this.aid) {
                    return
                }

                const callback = async () => {
                    this.aid = aid;
                    this.initDetail();
                    await this.initArticleList();
                    this.$router.replace(`/main/article/edit?mid=${this.mid}&aid=${aid}`);
                };

                if (confirm) {
                    this.$showConfirm("确定已保存数据，以免数据丢失", callback);
                } else {
                    callback();
                }
            },

            async addNew() {
                this.aid = "";
                this.initDetail();
                this.$router.replace(`/main/article/edit?mid=${this.mid}`);
            },

            insertArticle(id, title) {
                this.insertHTML(`<a href="#/article?id=${id}">${title}</a>`);
            },

            insertStyle(content) {
                this.insertHTML(content);
            },

            insertTemplate(html) {
                this.insertHTML(html)
            },

            insertHTML(html) {
                this.$editor.html.insert(html, true);
            },

            //另存为模板
            async saveAsTemplate() {
                const {name} = this.$getSession(this.KEYS.USER_INFO);
                await this.$post(`SaveHtmlTemp`, {
                    Id: 0,
                    Shared: 0,
                    Tempname: this.templateName,
                    Hbhtmltemp: this.model,
                    Createname: name,
                }).then(res => {
                    if (res.Code === 200) {
                        this.$showMsgTip(`保存成功`);
                    } else {
                        this.$showErrorTip(`保存失败`);
                    }
                });

                this.$broadcast(this.EVENTS.RELOAD_ARTICLE_TEMPLATE_LIST, "ArticleEdit");

                this.addTemplateDialogVisible = false;
            }
        },

        computed: {
            articleList() {
                return this.$store.state.attribute.articleList;
            },

            previewUrl() {
                return `#/article?id=${this.aid}&uid=${this.$getSession(this.KEYS.USER_ID)}`;
            }
        },

        components: {
            styleTemplate,
            preview,
            articleTemplateSelf,
            articleTemplatePublic,
        }
    }
</script>
