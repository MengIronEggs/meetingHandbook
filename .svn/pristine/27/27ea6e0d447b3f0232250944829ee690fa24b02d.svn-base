<template>
    <div class="AdministrationEdit">
        <div class="content">
            <div class="button_Box">
                 <el-button type="primary" @click="addBtnClick">添加</el-button>
                 <el-button type="danger"  @click="deleteBtnClick">删除</el-button>
                 <el-button type="info" @click="editBtnClick">编辑</el-button>
                 <el-button type="warning" @click="AdminSetUp">设置权限</el-button>
                <el-input
                    class="SearchInput"
                    placeholder="请输入姓名电话"
                    v-model="lookUpInfo">
                    <el-button slot="append" icon="el-icon-search" @click="InputSearchClick"></el-button>
                </el-input>
            </div>
        </div>
         <!-- 表格 -->
        <div class="tables">
            <template>
                <el-table
                    style="width: 100%"
                    :data="tableData"
                    height="400"
                     @selection-change="SelectionChange"
                    border
                >
                    <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                    </el-table-column>
                     <el-table-column
                        fixed
                        width="60"
                        label="头像"
                        align="center">
                            <template slot-scope="scope">
                                <!-- <el-button type="text" @click="smallBtnClick(scope.row)">{{scope.row.filename}}</el-button> -->
                                <img style="width:40px;" :src="scope.row.userheadimg" alt="">
                            </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        align="center"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        align="center"
                        label="电话">
                    </el-table-column>
                    <el-table-column
                        prop="shortName"
                        align="center"
                        label="公司简称">
                    </el-table-column>
                    <el-table-column
                        prop="department"
                        align="center"
                        label="部门">
                    </el-table-column>
                    <el-table-column
                        prop="usertitle"
                        align="center"
                        label="职位">
                    </el-table-column>
                    <el-table-column
                        prop="password"
                        align="center"
                        label="密码">
                    </el-table-column>
                    <el-table-column
                        prop="isadmin"
                        align="center"
                        label="是否为管理员">
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- 分页器 -->
        <div class="pages">
          <el-pagination
            :page-size="PageSize"
            layout="prev, pager, next"
            @current-change='PageLoad'
            :current-page.sync='page'
            :total="500">
          </el-pagination>
        </div>
        <!-- 添加和编辑的弹窗 -->
         <el-dialog :title="titleName" v-if="dialogVisible" :visible.sync="dialogVisible" >
              <el-form :model="dialogFrom">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="dialogFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="dialogFrom.phone"></el-input>
                </el-form-item>
                <el-form-item label="公司简称" :label-width="formLabelWidth">
                    <el-input v-model="dialogFrom.companyName"></el-input>
                </el-form-item>
                <el-form-item label="部门" :label-width="formLabelWidth">
                    <el-input v-model="dialogFrom.department"></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="dialogFrom.position"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="dialogFrom.password"></el-input>
                </el-form-item>
                <el-form-item label="是否为管理员" :label-width="formLabelWidth">
                    <el-checkbox-group v-model="dialogFrom.checked">
                        <el-checkbox label="是/否"  @change="onChange" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> 
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancalClick">取 消</el-button>
                <el-button type="primary" @click="dialogSubClick">确 定</el-button>
            </div>
         </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      lookUpInfo: "",
      tableData: [],
      PageSize:10,
      page:1,
      selectArr: [],
      // 弹窗名称
      titleName: "",
      dialogVisible: false,
      formLabelWidth: "100px",
      dialogFrom: {
        name: "",
        phone: "",
        companyName: "",
        department: "",
        position: "",
        password: "",
        checked: false
      },
      isadmin: 0
    };
  },
  methods: {
    //   页面数据加载的方法
    PageLoad() {
      // this.$get('GetYunUserWhere').then(res=>{
      this.$get("GetYunUserSearch?page=" + this.page + "&size=" + this.PageSize).then(res => {
        if (res.Code == 200) {
          res.Data = res.Data.map(item => {
            if (item.isadmin == 0) {
              item.isadmin = "否";
            } else {
              item.isadmin = "是";
            }
            return item;
          });
          // console.log(res.Data);
          this.tableData = res.Data;
        }
      });
    },
    //   选择行的change事件
    SelectionChange(val) {
      this.selectArr = val;
    },
    //   行内设置按钮的点击事件
    handleClick(item) {
      // console.log(item);
      this.$router.push({ path: "/adminSetup", query: { userid: item.id } });
    },
    // 添加按钮的点击事件
    addBtnClick() {
      this.dialogVisible = true;
      this.titleName = "添加";
      this.dialogFrom.name = "";
      this.dialogFrom.password = "";
      this.dialogFrom.phone = "";
      this.dialogFrom.companyName = "";
      this.dialogFrom.department = "";
      this.dialogFrom.position = "";
    },
    // 删除的点击事件
    deleteBtnClick() {
      if (this.selectArr.length > 1) {
        this.$showErrorTip("您只能选择一条记录删除");
        return false;
      }
      if (this.selectArr.length == 0) {
        this.$showErrorTip("请您选择需要删除的记录");
        return false;
      }
      let post_data = {
        company: this.selectArr[0].company,
        deleted: this.selectArr[0].deleted,
        department: this.selectArr[0].department,
        id: this.selectArr[0].id,
        name: this.selectArr[0].name,
        password: this.selectArr[0].password,
        phone: this.selectArr[0].phone,
        shortName: this.selectArr[0].shortName,
        userheadimg: this.selectArr[0].userheadimg,
        usertitle: this.selectArr[0].usertitle,
        yun_openid: this.selectArr[0].yun_openid
      };
      this.$post("YunUserDelete", post_data).then(res => {
        if (res.Code == 200) {
          this.PageLoad();
        }
      });
    },
    // 编辑的点击事件
    editBtnClick() {
      this.titleName = "编辑";
      if (this.selectArr.length > 1) {
        this.$showErrorTip("您只能选择一条记录编辑");
        return false;
      }
      if (this.selectArr.length == 0) {
        this.$showErrorTip("请您选择需要编辑的记录");
        return false;
      }
      // console.log('======',this.selectArr);
      // 判断用户是否为管理员
      if (this.selectArr[0].isadmin == '是') {
        this.dialogFrom.checked = true;
      } else {
        this.dialogFrom.checked = false;
      }
      this.dialogFrom.name = this.selectArr[0].name;
      this.dialogFrom.phone = this.selectArr[0].phone;
      this.dialogFrom.companyName = this.selectArr[0].shortName;
      this.dialogFrom.department = this.selectArr[0].department;
      this.dialogFrom.position = this.selectArr[0].usertitle;
      this.dialogFrom.password = this.selectArr[0].password;
      this.dialogVisible = true;
    },
    // 权限设置的点击事件
    AdminSetUp() {
      if (this.selectArr.length > 1) {
        this.$showErrorTip("您只能选择一条记录设置权限");
        return false;
      }
      if (this.selectArr.length == 0) {
        this.$showErrorTip("请您选择需要设置权限的记录");
        return false;
      }
      this.$router.push({
        path: "/adminSetup",
        query: { userid: this.selectArr[0].id }
      });
    },
    // 搜索的点击事件
    InputSearchClick() {
      this.$get(`GetYunUserSearch?value=${this.lookUpInfo}`).then(res => {
        if (res.Code == 200) {
          res.Data = res.Data.map(item => {
            if (item.isadmin == "0") {
              item.isadmin = "否";
            } else {
              item.isadmin = "是";
            }
            return item;
          });
          this.tableData = res.Data;
        }
      });
    },
    // 弹窗取消的点击事件
    dialogCancalClick() {
      this.dialogVisible = false;
      this.dialogFrom.name = "";
      this.dialogFrom.phone = "";
      // this.dialogFrom.department = '';
      // this.dialogFrom.position = '';
      this.dialogFrom.password = "";
    },
    // 弹窗确定的点击事件
    dialogSubClick() {
      let post_data = {};
      if (this.titleName == "添加") {
        post_data.company = "";
        post_data.deleted = 0;
        post_data.department = this.dialogFrom.department;
        post_data.id = "";
        post_data.name = this.dialogFrom.name;
        post_data.password = this.dialogFrom.password;
        post_data.phone = this.dialogFrom.phone;
        post_data.isadmin = this.isadmin;
        post_data.shortName = this.dialogFrom.companyName;
        post_data.userheadimg = "";
        post_data.usertitle = this.dialogFrom.position;
        post_data.yun_openid = "";
      } else {
        post_data.company = this.selectArr[0].company;
        post_data.deleted = this.selectArr[0].deleted;
        post_data.department = this.dialogFrom.department;
        post_data.id = this.selectArr[0].id;
        post_data.name = this.dialogFrom.name;
        post_data.password = this.dialogFrom.password;
        post_data.phone = this.dialogFrom.phone;
        post_data.isadmin = this.isadmin;
        post_data.shortName = this.dialogFrom.companyName;
        post_data.userheadimg = this.selectArr[0].userheadimg;
        post_data.usertitle = this.dialogFrom.position;
        post_data.yun_openid = this.selectArr[0].yun_openid;
      }
      this.addEditPublicFn(post_data);
    },
    // 新增和编辑的公共方法
    addEditPublicFn(obj) {
      this.$post("YunUserSave", obj).then(res => {
        if (res.Code == 200) {
          this.$showMsgTip("成功");
          this.dialogVisible = false;
          // 刷新页面
          this.PageLoad();
        }
      });
    },
    // 复选框值改变的事件
    onChange(val) {
      if (val) {
        this.isadmin = 1;
      } else {
        this.isadmin = 0;
      }
    }
  },
  mounted() {
    this.PageLoad();
  }
};
</script>

<style lang="less" scoped>
.AdministrationEdit {
  position: relative;
  height: 100%;
  overflow: auto;
  padding-top: 30px;
}
.button_Box {
  padding: 10px;
  .SearchInput {
    width: 250px;
    float: right;
  }
}
</style>
<style scoped>
.el-form-item__label {
  text-align: center;
}
</style>

