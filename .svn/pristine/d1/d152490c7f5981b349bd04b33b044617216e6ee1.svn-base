<template>
    <div class="page">
        <div class="device">
          <div style="width:100%;height:100%;overflow:auto;">
             <el-input placeholder="" :disabled="true" v-model="searchVal">
                <el-button  slot="append" icon="el-icon-search"></el-button>
             </el-input>
             <div class="block" @click="chooseCarousel">
                <el-carousel trigger="click" height="207px" class="carousel" >
                      <el-carousel-item v-for="(item,index) in banner" :key="index">
                          <!--<router-link :to="item.linkUrl">-->
                              <img class="carousel-image" :src="item.imageUrl">
                          <!--</router-link>-->
                      </el-carousel-item>
                  </el-carousel>
             </div>
             <div class="entrance-list">
               <div class="modeList" :key="index" v-for="(item,index) in DataArr">
                  <div style="width:100%;height:50px;" @click="InputChange(index)">
                    <!-- <el-input v-show="DataArr" v-model="item.DataTitle" :disabled="true" placeholder="点击输入标题" ></el-input> -->
                    <div style="width:100%;height:50px;border-bottom:1px solid #ccc;border-top:1px solid #ccc;line-height:50px;font-size:18px;font-weight:500;padding-left:10px;">{{item.DataTitle}}</div>
                  </div>
                  <div class="entrance-item" :class="{'active':acitveTrue==index1}" v-for="(items, index1) in item.DataVal" :key="index1" @click="dataListClick(item.DataTitle,index,index1,items)">
                      <div class="cover-image">
                          <img class="entry-icon" v-if="items" :src="items.producticon" alt="" />
                      </div>
                      <p class="entry-label"  v-if="item">{{items.productname || index1}}</p>
                  </div>
                  <el-tooltip content="添加产品" placement="top">
                    <div v-show="addShow" class="addHover" style="" @click="newAddClick1(index)"></div>
                  </el-tooltip>
               </div>
               <el-tooltip content="添加标题和产品" placement="top">  
                 <div v-show="addShow" class="addHover1" style="width:100%;height:50px;" @click="newAddClick()"></div>
                </el-tooltip>
             </div>
             
             </div>
             <div style="position:abolute;background:#fff;height:40px;border-top:1px solid #ccc;overflow:hidden;">
                <el-row style="margin-top:3px;">
                  <el-col :span="6"><div class="grid-content bg-purple-light"><el-button style="width:100%;height:100%;border-radius:0" type="primary" size="small" @click="OneClick(btnList.id)">{{btnList.productprop.one}}</el-button></div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light"><el-button  style="width:100%;height:100%;border-radius:0" type="primary" size="small" @click="twoClick(btnList.id)">{{btnList.productprop.two}}</el-button></div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light"><el-button  style="width:100%;height:100%;border-radius:0" type="primary" size="small" @click="threeClick(btnList.id)">{{btnList.productprop.three}}</el-button></div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple-light"><el-button  style="width:100%;height:100%;border-radius:0" type="primary" size="small" @click="fourClick(btnList.id)">关于我们</el-button></div></el-col>
                </el-row>
             </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      acitveTrue: null,
      mid: this.$route.query.mid,
      inputVal: "",
      addShow:true,
    };
  },
  methods: {
    // 整体新增的点击事件
    newAddClick() {
      // this.$store.state.attribute.objectType = 'newTitle';
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        let obj = {};
        obj.DataTitle = "点击输入标题";
        obj.DataVal = [];
        this.$store.state.attribute.managementArr.push(obj);
        let index = this.DataArr.length - 1;
        this.InputChange(index);
      } else {
        this.$showErrorTip("您没有操作权限");
      }
    },
    // 行内新增
    newAddClick1(index) {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        if (
          this.$store.state.attribute.managementArr[index].DataTitle == "" ||
          this.$store.state.attribute.managementArr[index].DataTitle ==
            "点击输入标题"
        ) {
          this.$showErrorTip("请先输入标题");
          return false;
        }
        let childObj = {};
        childObj.id = "";
        childObj.producticon = ""; //图片
        childObj.productorder = 0; //顺序
        childObj.productclass = ""; //类名
        childObj.producttype = ''; //类型
        childObj.productclass = ""; //名称
        childObj.productprop = {}; //数据集
        childObj.productprop.allPeopleArr = [];
        childObj.productprop.linkUrl = '';
        childObj.username = ""; //管理人姓名
        childObj.needauth = 0;
        this.$store.state.attribute.managementArr[index].DataVal.push(childObj);
        this.$store.state.attribute.objectType = "manage";
        var lableIndex =
          this.$store.state.attribute.managementArr[index].DataVal.length - 1;
        this.$store.commit("chooseManage", {
          choosManIndex: index,
          chooseLableIndex: lableIndex
        });
      } else {
        this.$showErrorTip("您没有操作权限");
      }
    },
    // 轮播图的点击事件
    chooseCarousel() {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        this.$store.state.attribute.isState = "Banner";
        this.$store.commit("chooseCarousel", {});
      } else {
          this.$showErrorTip("您没有操作权限");
      }
    },
    // 新建标题的点击事件
    InputChange(index) {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        this.$store.state.attribute.objectType = "newTitle";
        // 获取到对应的下标
        this.$store.commit("chooseManage", {
          choosManIndex: index,
          chooseLableIndex: ""
        });
      } else {
        this.$showErrorTip("您没有操作权限");
      }
    },
    // 栏目下面的数据的点击事件
    dataListClick(title, index, index1, items1) {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      let isUserId = JSON.parse(USER_INFO).Id;
      if (isadmin === 1) {
        this.$store.state.attribute.objectType = "manage";
        // 赋值到vuex用于属性区总监取值显示
        this.$store.commit("chooseManage", {
          choosManIndex: index,
          chooseLableIndex: index1
        });
      } else {
        let userAuthArr = items1.productprop.allPeopleArr;
        let adminFlag = userAuthArr.find(
          (value, index, arr) => {
            return value == isadmin;
          }
        );
        if (adminFlag) {
          this.$store.state.attribute.objectType = "manage";
          // 赋值到vuex用于属性区总监取值显示
          this.$store.commit("chooseManage", {
            choosManIndex: index,
            chooseLableIndex: index1
          });
        } else {
          this.$showErrorTip("您没有操作权限");
        }
      }
    },
    // 底部按钮的点击事件
    OneClick(id) {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        this.$store.state.attribute.objectType = "btnLink";
      } else {
        // let adminFlag = this.$store.state.attribute.adminArr.find(
        //   (value, index, arr) => {
        //     return value == id;
        //   }
        // );
        // if (adminFlag) {
        // } else {
          this.$showErrorTip("您没有操作权限");
        // }
      }
    },
    twoClick(id) {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        this.$store.state.attribute.objectType = "btnLink";
      } else {
        // let adminFlag = this.$store.state.attribute.adminArr.find(
        //   (value, index, arr) => {
        //     return value == id;
        //   }
        // );
        // if (adminFlag) {
        //   this.$store.state.attribute.objectType = "btnLink";
        // } else {
          this.$showErrorTip("您没有操作权限");
        // }
      }
    },
    threeClick(id) {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        this.$store.state.attribute.objectType = "btnLink";
      } else {
        // let adminFlag = this.$store.state.attribute.adminArr.find(
        //   (value, index, arr) => {
        //     return value == id;
        //   }
        // );
        // if (adminFlag) {
        //   this.$store.state.attribute.objectType = "btnLink";
        // } else {
          this.$showErrorTip("您没有操作权限");
        // }
      }
    },
    fourClick(id) {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if (isadmin === 1) {
        this.$store.state.attribute.objectType = "btnLink";
      } else {
        // let adminFlag = this.$store.state.attribute.adminArr.find(
        //   (value, index, arr) => {
        //     return value == id;
        //   }
        // );
        // if (adminFlag) {
        //   this.$store.state.attribute.objectType = "btnLink";
        // } else {
          this.$showErrorTip("您没有操作权限");
        // }
      }
    }
  },
  mounted() {
    let USER_INFO = sessionStorage.getItem("USER_INFO");
    let isadmin = JSON.parse(USER_INFO).isadmin;
    if (isadmin === 1) {
      this.addShow = true;
    }else{
      this.addShow = false;
    }
  },
  created() {},
  computed: {
    banner() {
      return this.$store.state.attribute.LoadBanner.productprop;
    },
    DataArr() {
      return this.$store.state.attribute.managementArr;
    },
    btnList() {
      return this.$store.state.attribute.footerList;
    }
  }
};
</script>

<style scoped lang='less'>
.page {
  display: flex;
  flex-grow: 1;
  padding: 0 10px;
}
.device {
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border: 1px solid #333;
  // width: 375px;
  width: 375px;
  margin: 0 auto;
  position: relative;
}

.carousel-image {
  width: 100%;
}
.entrance-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-top: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
}
.modeList {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  border-bottom: 1px solid #cccccc;
}
.entrance-item {
  width: 30%;
  border: 1px dotted #ccc;
  margin: 15px 1.65% 0 1.65%;
  &.active {
    border-color: red;
  }
}
.entrance-item:hover {
  cursor: pointer;
  border: 1px dotted #ff0000;
}

.clearfix {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 10px;
  border-bottom: 1px solid #cccccc;
  border-top: 1px solid #cccccc;
}

.entrance-item.active {
  border-color: red;
}

.cover-image {
  display: block;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
}

.entry-icon {
  position: absolute;
  top: 15%;
  left: 15%;
  height: 70%;
  width: 70%;
  border-radius: 50%;
}

.entry-label {
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
  text-align: center;
}
.addHover {
  width: 30%;
  height: 150px;
  position: relative;
  margin: 15px 1.65% 0 1.65%;
  background: url("http://img.guoanfamily.com/plusIcoc.png") no-repeat;
  background-position: center 30%;
  background-size: 30%;
}
.addHover:hover {
  border: 1px dotted #ff0000;
  cursor: pointer;
  background: url("http://img.guoanfamily.com/plusIcoc1.png") no-repeat;
  background-position: center 30%;
  background-size: 30%;
}
.addHover1 {
  width: 100%;
  height: 50px;
  background: url("http://img.guoanfamily.com/plusIcoc.png") no-repeat;
  background-position: center;
  background-size: 10%;
}
.addHover1:hover {
  border: 1px dotted #ff0000;
  cursor: pointer;
  background: url("http://img.guoanfamily.com/plusIcoc1.png") no-repeat;
  background-position: center;
  background-size: 10%;
}
</style>
<style lang='less'>
.box-card {
  .el-card__header {
    padding: 10px 0 10px 10px !important;
  }
}
</style>

