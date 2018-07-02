<template>
    <div>
        <!-- 行政内容管理编辑 -->
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in breadArr" :key="index" :to="{path:item.path}">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h4>选择卡片</h4>
        <!-- 头部部分 -->
        <div class="topAbout">
            <div class="searChInput">
              <el-input v-model="names" placeholder="输入姓名或电话">
                    <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="searChInput1">
              <!-- <el-input v-model="names1" placeholder="输入姓名或电话">
                    <el-button @click="searchClick1" slot="append" icon="el-icon-search"></el-button>
              </el-input> -->
            </div>
            <el-transfer
                filterable
                :titles = titles
                filter-placeholder="请输入姓名"
                v-model="AboutUs.productprop.aboutUs.userArr"
                :data="data2">
            </el-transfer>
        </div>
        <!-- 文本部分 -->
        <div class="TheText">
            <froala class="editor-box" v-if="config" :tag="'textarea'" :config="config" v-model="AboutUs.productprop.aboutUs.text"></froala>
        </div>
        <div style="width:100%;height:40px;margin-top:20px;text-align:center">
              <el-button type="primary" @click="saveClick">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    const UPLOAD_EDITOR_IMAGE = this.UPLOAD_EDITOR_IMAGE;

    return {
      breadArr: [
        { path: "/managementEdit", name: "综合行政" },
        { path: "/aboutUs", name: "关于我们" }
      ],
      names: "",
      names1:"",
      value2: [],
      data2: [],
      titles: ["人员列表", "选择结果"],
      //   文体部分
      text: null,
      config: {
        placeholder: "",
        language: "zh_cn",
        heightMin: 480,
        widthMin: 800,
        height: 480,
        width: "100%",
        direction: "ltr",
        toolbarButtons: [
          "html",
          "fullscreen",
          "|",
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "|",
          "quote",
          "insertHR",
          "subscript",
          "superscript",
          "undo",
          "redo",
          "|",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "|",
          "fontFamily",
          "|",
          "fontSize",
          "|",
          "color",
          "emoticons",
          "inlineStyle",
          "|",
          "paragraphFormat",
          "|",
          "paragraphStyle",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          "clearFormatting",
          "insertimg",
          "lineHeight"
        ],
        allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
        imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
        imageUploadURL: UPLOAD_EDITOR_IMAGE,
        videoUploadURL: UPLOAD_EDITOR_IMAGE,
        events: {
          "froalaEditor.initialized": (e, editor) => {
            this.$editor = editor;
          }
        }
      }
    };
  },
  methods: {
    searchClick() {
      this.$get("GetYunUserSearch?value=" + this.names).then(res => {
        if (res.Code == 200) {
          let newDataArr = [];
          newDataArr = res.Data.map(item => {
            item.label = item.name + "(" + item.shortName + ")";
            item.key = item.id;
            return item;
          });
          this.data2 = newDataArr;
        }
      });
    },
    // searchClick1(){
    //   let obj = this.AboutUs.productprop.aboutUs.userArr;
    //   if(this.names1){
    //     console.log(obj);
    //   }
    // },
    nameListLoad() {
      this.$get("GetYunUserSearch").then(res => {
        if (res.Code == 200) {
          // this.data2 = res.Data;
          let newDataArr = [];
          newDataArr = res.Data.map(item => {
            item.label = item.name + "(" + item.shortName + ")";
            item.key = item.id;
            return item;
          });
          this.data2 = newDataArr;
        }
      });
    },
    // 保存的点击事件
    saveClick() {
      this.submit(this.AboutUs);
    },
    // 保存的方法
    submit(obj) {
      let obj1 = {};
      Object.assign(obj1, obj);
      obj1.userid = sessionStorage.getItem("USER_ID");
      obj1.userid = parseInt(obj1.userid);
      obj1.productprop = JSON.stringify(obj1.productprop);
      obj1.producttype = parseInt(obj1.producttype);
      if (obj1.productorder) {
        obj1.productorder = parseInt(obj1.productorder);
      }
      this.$post(`AsProductlistSave`, obj1).then(res => {
        if (res.Code == 200) {
          this.$showMsgTip(`保存成功`);
        }
      });
    }
  },
  mounted() {
    this.nameListLoad();
  },
  computed: {
    AboutUs() {
      return this.$store.state.attribute.footerList;
    }
  }
};
</script>

<style lang='less' scoped>
.topAbout {
  width: 600px;
  margin: 0 auto;

  height: 400px;
  position: relative;
  .searChInput {
    width: 248px;
    height: 40;
    // background: red;
    z-index: 200;
    position: absolute;
    left: 1px;
    top: 50px;
  }
  .searChInput1 {
    width: 248px;
    height: 40;
    z-index: 200;
    position: absolute;
    right: 5px;
    top: 50px;
  }
}
</style>
<style>
a[href="https://www.froala.com/wysiwyg-editor?k=u"] {
  display: none !important;
}
</style>
<style lang='less'>
.el-transfer-panel {
  width: 250px;
}
.el-transfer-panel__filter {
  opacity: 0;
}
</style>

