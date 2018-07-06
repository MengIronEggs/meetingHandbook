<template>
    <div style="overflow:hidden;">
        <div class="container">
            <mStructure/>
            <mAttribute @refreshLis="managementListLoad"/>
        </div>
    </div>
</template>

<script>
import mStructure from "../../components/manageCompoent/mStructure";
import mAttribute from "../../components/manageCompoent/mAttribute";
// import preview from "../../components/Preview";
export default {
  components: {
    mStructure,
    mAttribute
    // preview
  },
  data() {
    return {
      form: {
        name: ""
      },
      mid: this.$route.query.mid,
      previewDialogVisible: false,
      previewUrl: `#/?id=${this.$route.query.mid}&uid=${this.$getSession(
        this.KEYS.USER_ID
      )}`
    };
  },
  methods: {
    goback() {
      this.$showConfirm("确定已保存数据，以免数据丢失", () => {
        this.$router.back();
      });
    },
    //   列表内容加载
    managementListLoad() {
      this.$get(`GetAsProductlistWhere`).then(res => {
        // 获取侧边栏list列表
        this.$store.state.attribute.menuArr = [];
        res.Data.map(item => {
          if (item.producttype == 2) {
            this.$store.state.attribute.menuArr.push(item);
          }
          return this.$store.state.attribute.menuArr;
        });
        // console.log('chulaildk',this.$store.state.attribute.menuArr);
        // 获取轮播图
        res.Data.map(item => {
          if (item.producttype == 0) {
            this.$store.state.attribute.LoadBanner.id = item.id;
            if (item.productclass == "") {
              this.$store.state.attribute.LoadBanner.productclass = "轮播图";
            } else {
              this.$store.state.attribute.LoadBanner.productclass =
                item.productclass;
            }
            this.$store.state.attribute.LoadBanner.producttype =
              item.producttype;
            if (item.productprop) {
              this.$store.state.attribute.LoadBanner.productprop = JSON.parse(
                item.productprop
              );
            }
            return item;
          }
        });
        // 获取button按钮
        res.Data.map(item => {
          if (item.producttype == 3) {
            this.$store.state.attribute.footerList.id = item.id;
            this.$store.state.attribute.footerList.producttype =
              item.producttype;
            if (item.productprop) {
              this.$store.state.attribute.footerList.productprop = JSON.parse(
                item.productprop
              );
              if (
                this.$store.state.attribute.footerList.productprop.aboutUs ==
                undefined
              ) {
                this.$store.state.attribute.footerList.productprop.aboutUs = {};
                this.$store.state.attribute.footerList.productprop.aboutUs.userArr = [];
                this.$store.state.attribute.footerList.productprop.aboutUs.text =
                  "";
              }
            }
            return item;
          }
        });
        let arr = Array.from(
          new Set(
            res.Data.map(item => {
              if (item.producttype == 1 || item.producttype == 2) {
                this.$store.state.attribute.editMangeMentList.id = item.id;
                return item.productclass;
              }
            })
          )
        );
        arr = arr.filter(item => {
          return !(!item || item === "");
        });
        this.$store.state.attribute.selectOption = [];
        // 将所有的title值获取
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.options = [];
          var chiObj = {};
          chiObj.label = arr[i];
          chiObj.value = i;
          obj.options.push(chiObj);
          this.$store.state.attribute.selectOption.push(obj);
        }
        var arr1 = [];
        // 获取到列表的title
        var listArr = res.Data.filter(item => {
          if (item.producttype !== 0) {
            return item;
          }
        });
        // 将获取到的数据格式化为渲染的json格式
        for (let i = 0; i < arr.length; i++) {
          let obj = {};
          obj.DataTitle = arr[i];
          obj.DataVal = [];
          for (var j = 0; j < listArr.length; j++) {
            if (arr[i] == listArr[j].productclass) {
              listArr[j].productprop = eval("(" + listArr[j].productprop + ")");
              obj.DataVal.push(listArr[j]);
            }
          }
          arr1.push(obj);
        }
        // 处理列表的prodectType
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr1[i].DataVal.length; j++) {
            if (arr1[i].DataVal[j].producttype == 1) {
              arr1[i].DataVal[j].producttype = "外部链接";
            } else {
              arr1[i].DataVal[j].producttype = "内容";
            }
          }
        }
        // 存储列表的数据
        this.$store.commit("managementList", {
          managementArr: arr1
        });
        let shortArr = arr1.map(item => {
          return item;
        });
        //console.log('1111111111111111',this.$store.state.attribute.footerList);
        // 存储按钮数组
        this.$store.commit("shortArrSet", {
          shortArr: shortArr
        });
        // 匹配按钮重构数组
        let btnArr = this.$store.state.attribute.footerList.productprop;
        let productListArr = [];
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i].DataTitle == btnArr.one) {
            productListArr[0] = arr1[i];
          }
          if (arr1[i].DataTitle == btnArr.two) {
            productListArr[1] = arr1[i];
          }
          if (arr1[i].DataTitle == btnArr.three) {
            productListArr[2] = arr1[i];
          }
        }
        // 存储列表的数据
        this.$store.commit("managementList", {
          managementArr: productListArr
        });
      });
    },
    PageListLoad() {
      let userid = sessionStorage.getItem("USER_ID");
      this.$get(`GetAsUserauthWhere?cond=userid&arg=${userid}`).then(res => {
        if (res.Code == 200) {
          this.$store.state.attribute.adminArr = res.Data.map(item => {
            if (item.producttype == 0) {
              return item.productid;
            }
          });
          this.$store.state.attribute.adminArr = this.$store.state.attribute.adminArr.filter(
            item => {
              return !(!item || item === "");
            }
          );
        }
      });
    }
  },
  created() {
    // 默认页面加载，清空vuex里面轮播数据
    this.$store.commit("initCarouselArray", {
      carouselArray: []
    });
    this.$store.commit("banner", {
      object: {
        id: "",
        producttype: "",
        productprop: []
      }
    });
    // // 默认页面加载，清空管理列表数据
    // this.$store.commit("managementList", {
    //   managementArr: []
    // });
  },
  mounted() {
    this.managementListLoad();
    this.PageListLoad();
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.footer {
  padding: 10px 0;
  width: 100%;
  text-align: center;
}
</style>
