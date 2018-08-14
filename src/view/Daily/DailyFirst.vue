<template>
    <div class="dailyFirst">
        <div class="container">
            <!-- 左边部分 -->
            <div class="page">
                <div class="device">
                    <!-- 轮播图部分 -->
                    <div class="bigDiv" style="width:100%;height:100%;overflow:auto;">
                        <div class="block" @click="chooseCarousel" style="border-bottom:1px solid #ccc;">
                            <el-carousel trigger="click"  height="207px" class="carousel" >
                                <el-carousel-item :key="index" v-for="(item,index) in bannerData.productprop">
                                        <img class="carousel-image" :src="item.imageUrl">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <!-- tab栏 -->
                        <div class="tabTop" style="overflow-y:hidden;">
                            <!-- <el-row :gutter="8" style="padding-left:0;padding-top:8px;overflow-x:hidden;">
                                <el-col :span="4.5" :key="index" v-for="(item,index) in tabArr"><div class="grid-content bg-purple" :class="{'active':active == index}" @click="colRowClick(index,item)">{{item}}</div></el-col>
                            </el-row> -->
                          <ul class="tab_ul">
                              <li v-for="(item,index) in tabArr" :key="index" :class="{active:active==index}" @click.stop="colRowClick(index,item,$event)">{{item}}</li>
                          </ul>
                        </div>
                        <!-- 公司list填充 -->
                        <div class="modeList">
                          <div class="entrance-item" :key="index" v-for="(item,index) in fileterCompanyArr" :class="{'companyActive':companyActive == index}"  @click="CompanyClick(index,item)">
                            {{item.companyname}}
                          </div>
                          <div style="width:100%;height:20px;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 属性区部分 -->
            <div class="page1">
                <div style='width:100%;height:500px;overflow-y:scroll;'>
                  <h4>属性区</h4>
                  <div v-if="!formType">
                      <el-card class="box-card">
                          <el-alert
                              title="请选择编辑区域..."
                              type="info"
                              show-icon
                              :closable="false"
                          >
                          </el-alert>
                      </el-card>
                  </div>
                   <!--轮播图属性-->
                  <div v-if="formType === 'carousel'">
                    <el-card class="box-card" v-for="(item, index) in bannerData.productprop" :key="index">
                      <el-form label-width="80px" class="carousel-item">
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                :action="UPLOAD_IMAGE"
                                :data="{pid: '4'}"
                                :show-file-list="false"
                                :on-success="(...arr)=>{
                                    handleAvatarSuccess(index, ...arr);
                                }"
                            >
                                <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>

                        <el-form-item label="跳转地址">
                            <el-input v-model="item.linkUrl" placeholder="请输入跳转链接"></el-input>
                        </el-form-item>
                        <!-- 删除图片按钮 -->
                        <el-button class="btn-remove" type="danger" icon="el-icon-delete" circle @click="removeCarouselItem(index)"></el-button>
                      </el-form>
                    </el-card>
                     <!-- 轮播底部增加图片按钮 -->
                    <div class="carousel-bottom">
                        <el-button class="btn-add" type="primary" icon="el-icon-plus" circle
                                  @click="addCarouselItem"></el-button>
                    </div>
                    <div v-if="formType === 'carousel'" style="width:100%;height:30px;margin-top:20px;">
                        <el-button style="width:50%;" type="primary" @click="saveClick">保存</el-button>
                    </div>
                  </div>
                  <!-- 公司属性 -->
                  <div v-if="formType === 'company'">
                    <div  class="company-dt"   v-if="this.showDtList.length !== 0 && isDisable02">
                      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409EFF" @select="handleSelect">
                        <el-menu-item v-for="(item, i) in this.showDtList" :key="i" :index="(i + 1 + '')" >{{item.departname}}</el-menu-item>
                      </el-menu>
                    </div>
                      <el-form label-width="80px" style="overflow-x:hidden;">
                        <el-form-item label="公司名称" v-if="this.showDtList.length === 0">
                              <el-input :disabled="true"  v-model="companyname" placeholder="公司名称"></el-input>
                        </el-form-item>
                         <el-form-item v-else label="部门名称">
                              <el-input :disabled="true"  v-model="departname" placeholder="部门名称"></el-input>
                        </el-form-item>
                        <el-form-item label="管理人">
                          <div class="page1-box">
                            <div class="box-left">{{showUserName}}</div>
                            <el-input class="box-right" @keyup.enter.native="searchClick" v-model="username" placeholder="输入姓名或电话搜索">
                                  <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                          </div>
                            
                        </el-form-item>
                        <template>
                          <div v-show="tableShow" style="width:100%;margin-left:14%;">
                           <el-table
                            ref="singleTable"
                            :data="tableData"
                            max-height="200"
                            highlight-current-row
                            @current-change="handleCurrentChange"
                            style="width: 100%;text-align:center;">
                            <el-table-column
                              type="index"
                              header-align='center'
                              width="50">
                            </el-table-column>
                            <el-table-column
                              property="shortname"
                              label="公司简称"
                              header-align='center'
                              width="80">
                            </el-table-column>
                            <el-table-column
                              property="name"
                              label="姓名"
                              header-align='center'
                              width="80">
                            </el-table-column>
                            <el-table-column
                              property="phone"
                              label="电话"
                              header-align='center'
                              width="120">
                            </el-table-column>
                           </el-table>
                          </div>
                        </template>
                        <div class="attribleDiv" style='position:relative;'>
                          <div class="adminPeople">授权人</div>
                          <el-form-item style="margin-top:20px;width:100%;" label="编辑授权">
                              <el-input v-model="namePhone" @keyup.enter.native="search1Click" placeholder="输入姓名或电话搜索">
                                    <el-button @click="search1Click" slot="append" icon="el-icon-search"></el-button>
                              </el-input>
                          </el-form-item>
                          <template>
                                <div style="width:86%;border:1px solid #ccc;border-radius:3px;height:160px;margin-left:80px;margin-top:20px;overflow-y:scroll;">
                                  <el-tag closable style="width:80%;margin-top:5px;"  @close="handleClose(item)" :key="index" v-for="(item,index) in allPeopleArr" type="info">{{item.name}}</el-tag>
                                </div>
                          </template>
                          <div style='position:absolute;top:64px;left:1px;width:100%;'>
                            <div v-show="tableShow1" style="width:100%;margin-top:20px;margin-left:80px;">
                                <el-table
                                ref="singleTable"
                                :data="tableData1"
                                max-height="150"
                                highlight-current-row
                                @current-change="handleCurrentChangeOne"
                                style="text-align:center;">
                                <el-table-column
                                  type="index"
                                  header-align='center'
                                  width="50">
                                </el-table-column>
                                <el-table-column
                                 header-align='center'
                                  property="shortname"
                                  label="公司简称"
                                  width="80">
                                </el-table-column>
                                <el-table-column
                                  header-align='center'
                                  property="name"
                                  label="姓名"
                                  width="80">
                                </el-table-column>
                                <el-table-column
                                  header-align='center'
                                  property="phone"
                                  label="电话"
                                  width="120">
                                </el-table-column>
                                </el-table>
                                <!-- <el-button style="width:50%;margin-top:5px;" type="primary" size="small" @click="completeClick">完成</el-button> -->
                            </div>
                          </div>
                          
                        </div>
                      </el-form>
                      <div>
                        <el-button style="margin-left:20%;width:30%;margin-top:15px;float:left;" type="primary" size="small" @click= 'JurisdictionClick(false)'>保存</el-button>
                        <el-button style="margin-left:40px;width:30%;margin-top:15px;float:left;" :disabled="isDisabled01" type="primary" size="small" @click= 'exitClcik'>编辑</el-button>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <el-button type="success" @click="previewDialogVisible = true">预览</el-button>
        </footer>
        <!-- 预览提示框 -->
        <manageprive :previewDialogVisible="previewDialogVisible" ref='onRefresList' @refreshList="onRefresList" :url="previewUrl" @close="previewDialogVisible = false" />
    </div>
</template>

<script>
import manageprive from "../../components/managePrive";
export default {
  components:{
    manageprive
  },
  data() {
    return {
      // 轮播图集合
      bannerData: {
        id: null,
        productclass: "",
        productprop: [],
        producttype: 4
      },
      //   tab栏数组
      tabArr: [],
      // tabIndex:0,
      active: null,
      //   全部公司数组
      companyListArr: [],
      //  筛选公司数组
      fileterCompanyArr: [],
      companyActive: 0,
      // 属性区部分
      formType: "",
      // 公司名称
      companyname: "",
      // 公司ID
      companyId: '',
      dailyclass: "",
      // 属性区部分字段名称
      username: "", //管理人姓名
      showUserName: '', //展示管理人姓名
      userid: "", //管理人id
      namePhone: "", //编辑授权字段
      tableShow: false, //管理人列表控制
      tableData: [], //管理人列表集合
      tableShow1: false, //授权人列表控制
      tableData1: [], //授权人列表集合
      allPeopleArr: [], //选取的授权人列表
      modelCheck: "", //是否限制查看
      listData: null,
      isDisabled01: false,
      activeIndex: '1',
      dtList: [],
      showDtList: [],
      departname: '', // 部门名称
      departItemData: {}, // 选中的具体部门
      isDisable02: true,
      // newIndex:null,
      // newItem:null,
      // 预览变量
      previewDialogVisible: false,
      previewUrl:'manageMentwap/#/DailyList',
    };
  },
  methods: {
    // 关闭方法
    onRefresList(){
     this.previewDialogVisible = false;
    },

    //   轮播图获取接口方法
    bannerLoadFn() {
      this.$get(`GetAsProductlistWhere`).then(res => {
        if (res.Code == 200) {
          res.Data.forEach(item => {
            if (item.producttype == 4) {
              this.bannerData.id = item.id;
              this.bannerData.productclass = item.productclass;
              this.bannerData.producttype = item.producttype;
              if (item.productprop) {
                this.bannerData.productprop = JSON.parse(item.productprop);
              }
            }
          });
        }
      });
    },
    // 轮播图的点击事件
    chooseCarousel() {
      let USER_INFO = sessionStorage.getItem("USER_INFO");
      let isadmin = JSON.parse(USER_INFO).isadmin;
      if(isadmin === 1){
        this.formType = "carousel";
      }else{
        this.$showErrorTip('您没有访问权限');
      }
      
    },
    /*轮播图控制添加空元素*/
    addCarouselItem() {
      this.bannerData.productprop.push({
        imageUrl: "",
        linkUrl: ""
      });
    },
    // 上传轮播图图片方法
    handleAvatarSuccess(index, res, file) {
      this.bannerData.productprop[index].imageUrl = res.Data.link;
      this.submit(this.bannerData);
    },
    // 保存的公共方法
    submit(obj) {
      obj.userid = sessionStorage.getItem("USER_ID");
      obj.userid = parseInt(obj.userid);
      obj.productprop = JSON.stringify(obj.productprop);
      this.$post(`AsProductlistSave`, obj).then(res => {
        if (res.Code == 200) {
          obj.productprop = JSON.parse(obj.productprop);
          this.bannerLoadFn();
          this.$showMsgTip(`操作成功`);
        }
      });
    },
    // 保存按钮的点击事件
    saveClick() {
      this.submit(this.bannerData);
    },
    // 移除轮播图的图片
    removeCarouselItem(index) {
      this.bannerData.productprop.splice(index, 1);
      this.submit(this.bannerData);
    },
    //  列表获取接口
    tabListLoadFn() {
      this.$get(`GetAsDailydictWhere`).then(res => {
        if (res.Code == 200) {
          // 获取tab栏的按钮
          this.tabArr = Array.from(
            new Set(
              res.Data.map(item => {
                return item.dailyclass;
              })
            )
          );
          let USER_INFO = sessionStorage.getItem("USER_INFO");
          let isadmin = JSON.parse(USER_INFO).isadmin;
          if(isadmin === 1){
            this.tabArr.splice(0, 1);
          }
          //获取列表数组
          this.companyListArr = res.Data;
          // 默认筛选第一栏tab对应公司
          this.colRowClick(this.table.tableIndex, this.tabArr[this.table.tableIndex]);
          if(this.table.companyContent !== null){
            this.CompanyClick(this.table.newIndex,this.table.companyContent);
          }
          
        }
      });
    },
     // 获取部门列表接口
    departmentLoadInfo() {
      this.$get(`GetAsDailydepartdictWhere`).then(res => {
        if (res.Code == 200 && res.Data) {
          // 获取tab栏的按钮
          this.dtList = res.Data || [];
        }
      });
    },
    // tab栏的点击事件
    colRowClick(index, item, ev) {
      this.table.tableIndex = index;
      this.namePhone = '';
      this.tableShow =  false;
      this.tableShow1 =  false;
      if (ev) {
        ev = ev || event;
        ev.preventDefault();
      }
      this.active = index;
      this.companyActive = 0;
      this.fileterCompanyArr = this.companyListArr.filter((items, index) => {
        return items.dailyclass == item;
      });
    },
    // 公司的点击事件
    CompanyClick(index, item) {
      this.table.newIndex =  index;
      this.table.companyContent = item;
      this.namePhone = '';
      this.tableShow =  false;
      this.tableShow1 =  false;
      this.companyActive = index;
      this.formType = "company";
      this.companyname = item.companyname;
      this.companyId = item.id
      this.dailyclass = item.dailyclass;
      this.listData = item;
      this.showUserName = item.username;
      this.userid = item.userid;
      if (item.dailyprop && item.dailyprop !== '""' && item.dailyprop.indexOf("{") == 0 && JSON.parse(item.dailyprop).allPeopleArr) {
        this.allPeopleArr = JSON.parse(item.dailyprop).allPeopleArr;
      } else {
        this.allPeopleArr = [];
      }
      this.selectDepartment(item.id)
    },
    // 公司下编辑的的点击事件
    exitClcik() {
      this.JurisdictionClick(true);
    },
    // 管理人搜索的点击事件
    searchClick() {
      if (this.username == "") {
        this.$showErrorTip("搜索关键字不能为空");
        return false;
      }
      this.tableData = [];
      this.$get(`GetYunUserSearch?value=${this.username}`).then(res => {
        if (res.Code == 200) {
          this.tableData = res.Data;
          this.tableShow = true;
        }
      });
    },
    // 管理人表格的点击事件
    handleCurrentChange(val) {
      if (val) {
        if(this.showUserName && this.showUserName != val.name) {
        }
        this.showUserName = val.name;
        this.username = ''; //val.name
        this.tableShow = false;
        this.userid = val.id;

      }
    },
    // 编辑授权的点击事件
    search1Click() {
      if (this.namePhone == "") {
        this.$showErrorTip("搜索关键字不能为空");
        return false;
      }
      this.tableData1 = [];
      this.$get(`GetYunUserSearch?value=${this.namePhone}`).then(res => {
        if (res.Code == 200) {
          this.tableData1 = res.Data;
          this.tableShow1 = true;
        }
      });
    },
    // tag的移除事件
    handleClose(tag) {
      for (let i = 0; i < this.allPeopleArr.length; i++) {
        // console.log(7777, tag)
        if (tag.name == this.allPeopleArr[i].name) {
          this.allPeopleArr.splice(i, 1);
        }
      }
    },
    //授权表格的点击事件
    handleCurrentChangeOne(val) {
      if (val) {
        this.tableShow1=false;
        var obj = {};
        obj.name = val.name;
        obj.id = val.id;
        this.allPeopleArr.push(obj);
      }
    },
    // 授权人完成的点击事件
    completeClick(){
      this.tableShow1=false;
      this.namePhone ='';
      if(this.tableData1.length == 1){
        var obj = {};
        obj.name = this.tableData1[0].name;
        obj.id = this.tableData1[0].id;
        this.allPeopleArr.push(obj);
      }
    },
    // 公司保存的点击事件
    JurisdictionClick(flag) {
   
      if(!this.showUserName){
        this.$showErrorTip('请输入管理人');
        return false;
      }
      if(!this.isUserPermission(this.userid)){
        return false;
      }
      let obj = null;
      if(this.allPeopleArr.length > 0){
         obj = {};
         obj.allPeopleArr = this.allPeopleArr;
      }else{
        obj = "";
      }
      if(this.showDtList.length !== 0) { // 部门
        // debugger
        let post_data = {
          departname: this.departname,
          departprop: JSON.stringify(obj),
          id: parseInt(this.departItemData.id),
          ddid: this.departItemData.ddid,
          ordernum: parseInt(this.departItemData.ordernum),
          updatetime: this.departItemData.updatetime,
          userid: this.userid,
          username: this.showUserName,
        };
       
        // if(obj === "") {
        //   post_data.departprop = obj
        // } else {
        //   post_data.departprop = JSON.stringify(obj)
        // }
        this.$post(`AsDailydepartdictSave`, post_data).then(res => {
          if (res.Code == 200) {
            if(flag) {
              this.$router.push({
                path: "/companyDetials",
                query: { companyName: this.companyname, dailyclass: this.dailyclass, departname: this.departname,}
              });
            }else{
              this.$showMsgTip(`保存成功`);
              this.init();
            }
          }
        });
      }else { // 公司
        let post_data = {
          companyname: this.companyname,
          dailyclass: this.dailyclass,
          dailyprop: JSON.stringify(obj),
          id: this.listData.id,
          ordernum: this.listData.ordernum,
          updatetime: this.listData.updatetime,
          userid: this.userid,
          username: this.showUserName
        };
        this.$post(`AsDailydictSave`, post_data).then(res => {
          if (res.Code == 200) {
            if(flag) {
              this.$router.push({
                path: "/companyDetials",
                query: { companyName: this.companyname, dailyclass: this.dailyclass }
              });
            } else{
              this.$showMsgTip(`保存成功`);
              this.init();
            }
          }
        });
        // this.$root.reloads();
      }
    },
    // 判断用户是否有权限编辑 (7点之后)
    isUserPermission(userid, arr) {
      var nowDate = new Date()
      var nowH = nowDate.getHours();
      // console.log(nowH, 23232)
      if(nowH > 19) {
        const USER_INFO = JSON.parse(sessionStorage.getItem('USER_INFO'))
        if(USER_INFO) {
          // this.isDisabled01  = (USER_INFO.isadmin === 1 || userid === USER_INFO.Id) ? true : false
          if(this.allPeopleArr.length !== 0) {
            for(var item of this.allPeopleArr){
              if(item.id === userid) {
                return true
              }
            }
          }
          if(USER_INFO.isadmin === 1 || USER_INFO.Id === userid) {
            return true
          } else {
            this.$showErrorTip("此时间暂时不能编辑");
            return false
          }
        }
      } 
      return true
    },
    // 筛选部门
    selectDepartment(id) {
      this.isDisable02 = false
      setTimeout(() => {
        this.isDisable02 = true
      },0)
      var arr = [];
      if(id !== this.table.newId){
        this.table.secondCompanyArr = [];
        this.dtList.forEach(item => {
          if(item.ddid == id) {
            this.table.secondCompanyArr.push(item)
          }
        })
      }
      this.table.newId = id;
      // 判断是否是显示所有的二级部门
      if(JSON.parse(sessionStorage.getItem('USER_INFO')).isadmin != 1) {
        var arr01 = [],
        userid = sessionStorage.getItem('USER_ID');
        this.table.secondCompanyArr.forEach(item => {
          var allPeopleArr = JSON.parse(item.departprop).allPeopleArr
          if(item.userid == userid) {
            arr01.push(item)
          } else if(item.departprop.indexOf("{") == 0 && allPeopleArr){
            allPeopleArr.forEach(items => {
              if(items.id == userid) {
                arr01.push(item)
              }
            })
          }
          this.showDtList = arr01;
        })
      }else {
        this.showDtList = this.table.secondCompanyArr;
      }
      if(this.table.secondCompanyArr.length !== 0) {
        // this.activeIndex = '1'
        this.$nextTick(() => {
          // console.log(this.table.secodCompanyKey);
          if(this.table.secodCompanyKey == null){
            this.activeIndex = '1';
          }else{
            this.activeIndex = this.table.secodCompanyKey;
          }
          
        })
        this.departname = this.table.secondCompanyArr[0].departname;
        this.departItemData = this.table.secondCompanyArr[0];
        this.departDataEcho(this.table.secondCompanyArr[this.table.secodCompanyKey-1]);
      }
     
      
    },
    // 选择具体部门
    handleSelect(key, keyPath) {
      this.table.secodCompanyKey = key;
      var item = this.showDtList[this.table.secodCompanyKey-1];
      this.departItemData = item;
      this.departname = item.departname;
      this.departDataEcho(item);
    },
    // 部门数据回显
    departDataEcho(item) {
      this.showUserName = item.username;
      this.table.secondCompanyContent = item;
      this.userid = item.userid;
      //JSON.parse(item.departprop).allPeopleArr
      if (item.departprop && item.departprop !== '""' && item.departprop.indexOf("{") == 0 && JSON.parse(item.departprop).allPeopleArr) {
        this.allPeopleArr = JSON.parse(item.departprop).allPeopleArr;
      } else {
        this.allPeopleArr = [];
      }
    },
    init() { // 入口
      this.tabListLoadFn();  
      this.departmentLoadInfo();
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if(to.path =='/companyDetials'){
  //     this.$route.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
  //   }
  //   // if(to.path == '/login') {
  //   //   console.log(this.$route, 100)
  //   //    this.$route.meta.keepAlive = false;
  //   // }
  //   // console.log(11111,this.$route.meta.keepAlive)
  //   next();
  // },

  mounted() {
    
  },
  created() {
    this.bannerLoadFn();
    this.init()
  },
  computed:{
    table(){
        return this.$store.state.attribute.dailyCacheArr;
    },
  }
};
</script>

<style lang='less' scoped>
.dailyFirst{
  height: 100%;
  .container{
    height: 100%;
  }
}
.bigDiv::-webkit-scrollbar {
  display: none;
}
ul li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.el-row {
  margin-bottom: 20px;
  width: 100% !important;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  font-size: 14px;
  // padding:4px;
  padding-left: 5px;
  padding-right: 5px;
  line-height: 36px;
  &.active {
    color: red;
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  overflow-x: hidden;
  overflow: hidden;
}
.page {
  display: flex;
  flex-grow: 1;
  padding: 0 10px;
  .device {
    display: flex;
    flex-direction: column;
    justify-content: start;
    border: 1px solid #333;
    width: 375px;
    height: 450px;
    overflow-y: auto;
    margin: 0 auto;
    position: relative;
    .carousel-image {
      width: 100%;
    }
    .tabTop {
      width: 100%;
      height: 45px;
      border-bottom: 1px solid #ccc;
      .tab_ul {
        margin: 0;
        padding: 0;
        // width: 100%;
        height: 40px;
        white-space: nowrap;
        li {
          // float: left;
          display: inline-block;
          height: 40px;
          // width: 23%;
          font-size: 13px;
          line-height: 40px;
          padding: 0 10px;
          position: relative;
          cursor: pointer;
          &.active {
            color: red;
          }
        }
      }
    }
    .modeList {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      position: relative;
      // border-bottom: 1px solid #cccccc;
      .entrance-item {
        width: 30%;
        height: 90px;
        background: #0078d7;
        line-height: 90px;
        text-align: center;
        border: 1px dotted #ccc;
        margin: 15px 1.65% 0 1.65%;
        font-weight: 600;
        &.companyActive {
          // border-color: red;
          color: #fff;
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
.page1 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 20px;
  max-width: 600px;
  height: 450px;
  border:1px solid #000;
  overflow-y: scroll;
  width: 100%;
  min-width: 350px;
  text-align: center;
  .box-card {
    margin: 10px;
  }
  .page1-box{
    display: flex;
    .box-left{
      margin: 0 10px;
      width: 150px;
      border-bottom: 1px solid #aaa;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
  }
  .attribleDiv {
    margin-top: 20px;
    width: 100%;
    height: auto;
    position: relative;
    overflow-x:hidden;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
  }
  .carousel-item {
    position: relative;
    padding-right: 100px;
  }
  .avatar {
    display: inline-block;
    height: 100px;
  }
  .btn-remove {
    position: absolute;
    top: 50%;
    right: 20px;
    color: #fff;
    transform: translate(0%, -50%);
  }
  .carousel-bottom {
    margin: 40px 0;
  }
  .company-dt{
    // margin-bottom: 10px;
    margin: 0 0 10px 20px;
  }
  .company-dt /deep/ .el-menu-item {
    padding: 0 10px
  }
}
.adminPeople {
  position: absolute;
  left: 0;
  top: 60px;
  width: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #606266;
  text-align: right;
  padding-right: 15px;
}
.footer {
  // padding: 10px 0;
  width: 100%;
  text-align: center;
  position:relative;
  bottom:20px;
}

</style>
