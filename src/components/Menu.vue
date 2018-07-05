<template>
   <div class="Menu">
       <nav class="navigation">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                background-color="#3e3f41"
                text-color="#fff"
                :active-text-color="activeBigColor"
                :router="true"
                >
                <router-link to="/main">
                    <el-menu-item @click.native="activeColor = false" index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">会议手册</span>
                    </el-menu-item>
                </router-link>
                <el-submenu index="2" @click.native="titleClick">
                    <template slot="title" >
                        <i class="el-icon-setting" :class="{'oSpan': activeColor}"></i>
                        <span :class="{'oSpan': activeColor}">综合行政</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item @click.native.stop="listClick(item)" :key="index1" :index="item.productname" v-for="(item,index1) in menuArr" >
                          <img style="width:20px;margin-left:5px;" :src="item.producticon" alt="">
                          <span>{{item.productname}}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <router-link to="/personalmanagement">
                    <el-menu-item v-show="isShowAdminMenu" @click.native="activeColor = false" index="3">
                        <img v-show="imgFlag" src="../../static/personal.png" style="width:20px;" alt="">
                        <img v-show="!imgFlag" src="../../static/personal1.png" style="width:20px;" alt="">
                        <span slot="title"><span style="display:inline-block;width:8px;"></span>人员管理</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/dailyfirst">
                    <el-menu-item @click.native="activeColor = false" index="4">
                        <i class="el-icon-view"></i>
                        <span slot="title">日报管理</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/ComprehensiveSearch">
                    <el-menu-item @click.native="activeColor = false" index="5">
                        <i class="el-icon-search"></i>
                        <span slot="title">综合搜索</span>
                    </el-menu-item>
                </router-link>
               <router-link to="/fulltextsearch">
                    <el-menu-item @click.native="activeColor = false" index="6">
                        <i class="el-icon-search"></i>
                        <span slot="title">全文检索</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </nav>
   </div>
</template>

<script>
export default {
  data() {
    return {
      activeBigColor:"#ffd04b",
      isShowAdminMenu1: true,
      activeColor:false,
      imgFlag:true,
    };
  },
  methods: {
    titleClick() {
      this.activeColor = true;
      this.$router.push({ path: "/managementEdit" });
    },
    listClick(item) {
      this.activeColor = false;
      this.$store.state.attribute.menuBtnIndex.id = item.id;
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      let Menuid = item.id;
      if (isadmin === 1) {
        this.$router.push({
          path: "/AdministrationEdit",
          query: { pid: item.id }
        });
      } else {
        let adminFlag = this.$store.state.attribute.adminArr.find(
          (value, index, arr) => {
            return value == Menuid;
          }
        );
        if (adminFlag) {
          this.$router.push({
            path: "/AdministrationEdit",
            query: { pid: item.id }
          });
        } else {
          this.$showErrorTip("您没有操作权限");
          this.$router.replace("/managementEdit");
        }
      }
    }
  },
  created() {},
  watch:{
    activeColor(){
      if(this.activeColor){
        this.activeBigColor = "#ffffff";
      }else{
        this.activeBigColor = "#ffd04b";
      }
    },
    $route:function(){
      if(this.$route.path == '/personalmanagement'){
        this.imgFlag = false;
      }else{
        this.imgFlag = true;
      }
    }
  },
  computed: {
    menuArr() {
      return this.$store.state.attribute.menuArr;
    },
    isShowAdminMenu() {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      if (USER_INFO) {
        let isadmin = JSON.parse(USER_INFO).isadmin;
        if (isadmin === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.Menu {
  height: 100%;
}
.navigation {
  width: 100%;
  height: 100%;
  background: #3e3f41;
}
.el-menu-vertical-demo {
  border: none;
}

.el-menu-item {
  border-bottom: 1px solid #afafaf;
}

.el-menu-item:last-child {
  border: none;
}

.el-menu-item:first-child {
  border-top: 1px solid #afafaf;
}
</style>
<style>
  .oSpan{
    color:#ffd04b !important;
  }
</style>

