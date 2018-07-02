<template>
    <div>
        <!--面包屑 -->
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in breadArr" :key="index" :to="{path:item.path}">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="width:100%;position:relative;margin-top:20px;">
          <div style="width:600px;height:400px;margin:20px auto;">
            <div class="adminList" style="float:left;">
             <!-- default-expand-all -->
             <div class="adminType">行政权限</div>
              <el-tree
                  :data="data"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  @check-change="AdminGetCurrentKey"
                  :props="defaultProps">
              </el-tree>
            </div>
            <!-- default-expand-all -->
            <div class="adminList" style="float:right;">
              <div class="adminType">日报权限</div>
              <el-tree
                  :data="data1"
                  show-checkbox
                  node-key="id"
                  ref="tree1"
                  @check-change="dailyCurrentKey"
                  :props="defaultProps1">
              </el-tree>
            </div>
          </div>
        </div>
        <div style="width:100%;height:40px;line-height:40px;text-align:center;margin-top:20px;">
            <el-button type="primary" @click="queitClick">取消</el-button>
            <el-button type="primary" @click="resetFn">重置</el-button>
            <el-button type="primary" @click="saveAdminFn">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      breadArr: [
        { path: "/personalmanagement", name: "人员管理" },
        { path: "/adminSetup", name: "权限设置" }
      ],
      userid: 0,
      // 第一棵树
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      adminArr: [],
      // 第二棵树
      data1: [],
      defaultProps1: {
        children: "children",
        label: "label"
      },
      dailyManageMentArr: []
    };
  },
  methods: {
    // 加载权限
    managementListLoad() {
      // 综合行政权限列表获取
      this.$get(`GetAsProductlistWhere?cond=needauth&arg=0`).then(res => {
        if (res.Code == 200) {
          let arr = Array.from(
            new Set(
              res.Data.map(item => {
                if (
                  item.producttype == 0 ||
                  item.producttype == 1 ||
                  item.producttype == 2 ||
                  item.producttype == 3
                ) {
                  return item.productclass;
                }
              })
            )
          );
          arr = arr.filter(item => {
            return !(!item || item === "");
          });
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
                listArr[j].productprop = eval(
                  "(" + listArr[j].productprop + ")"
                );
                obj.DataVal.push(listArr[j]);
              }
            }
            arr1.push(obj);
          }
        }
        // 格式化数据为树形结构
        for (let i = 0; i < arr1.length; i++) {
          var obj = {};
          obj.label = arr1[i].DataTitle;
          obj.children = [];
          if (arr1[i].DataVal.length > 0) {
            for (let j = 0; j < arr1[i].DataVal.length; j++) {
              var childObj = {};
              if (arr1[i].DataVal[j].productname !== "") {
                childObj.id = arr1[i].DataVal[j].id;
                childObj.label = arr1[i].DataVal[j].productname;
                obj.children.push(childObj);
              } else {
                obj.id = arr1[i].DataVal[j].id;
              }
            }
          } else {
            var id = 0;
            for (let z = 0; z < res.Data.length; z++) {
              if (arr1[i].DataTitle == res.Data[z].productclass) {
                id = res.Data[z].id;
              }
            }
            obj.id = id;
          }
          this.data.push(obj);
        }
      });
      // 日报系统权限列表获取
      this.$get(`GetAsDailydictWhere`)
        .then(res => {
          if (res.Code == 200) {
            // 获取所有部门
            let departMentArr = Array.from(
              new Set(
                res.Data.map(item => {
                  return item.dailyclass;
                })
              )
            );

            // 构造树形结构
            for (let i = 0; i < departMentArr.length; i++) {
              let obj = {};
              obj.label = departMentArr[i];
              obj.children = [];
              for (let j = 0; j < res.Data.length; j++) {
                if (res.Data[j].dailyclass == departMentArr[i]) {
                  let childObj = {};
                  childObj.id = res.Data[j].id;
                  childObj.label = res.Data[j].companyname;
                  obj.children.push(childObj);
                }
              }
              this.data1.push(obj);
            }
          }
        })
        .then(() => {
          this.PageListLoad();
        });
    },
    // 获取选择的树的key的方法(行政权限树)
    AdminGetCurrentKey() {
      let a = this.$refs.tree.getCheckedNodes();
      this.adminArr = [];
      a.forEach(item => {
        this.adminArr.push(item.id);
      });
      this.adminArr = this.adminArr.filter(item => {
        return !(!item || item === "");
      });
    },
    //  获取选择的树的key的方法(日报权限树)
    dailyCurrentKey() {
      let a = this.$refs.tree1.getCheckedNodes();
      this.dailyManageMentArr = [];
      a.forEach(item => {
        this.dailyManageMentArr.push(item.id);
      });
      this.dailyManageMentArr = this.dailyManageMentArr.filter(item => {
        return !(!item || item === "");
      });
    },
    // 保存设置的权限方法
    saveAdminFn() {
      let post_data = [];
      for (let i = 0; i < this.adminArr.length; i++) {
        let obj = {};
        obj.producttype = 0;
        obj.productid = this.adminArr[i];
        obj.userid = parseInt(this.userid);
        post_data.push(obj);
      }
      for (let i = 0; i < this.dailyManageMentArr.length; i++) {
        let obj = {};
        obj.producttype = 1;
        obj.productid = this.dailyManageMentArr[i];
        obj.userid = parseInt(this.userid);
        post_data.push(obj);
      }
     console.log(post_data);
      this.$post("AsBatchAuthSave", post_data).then(res => {
        if (res.Code == 200) {
          this.$showMsgTip("设置成功");
          this.$router.push({ path: "/personalmanagement" });
        }
      });
    },
    // 重置的点击事件
    resetFn(){
      this.adminArr = [];
      this.dailyManageMentArr = [];
      this.$refs.tree.setCheckedKeys(this.adminArr);
      this.$refs.tree1.setCheckedKeys(this.dailyManageMentArr);
    },
    // 取消的点击事件
    queitClick(){
      history.go(-1);
    },
    // 查询权限接口
    PageListLoad() {
      this.$get(`GetAsUserauthWhere?cond=userid&arg=${this.userid}`).then(
        res => {
          if (res.Code == 200) {
            this.adminArr = res.Data.map(item => {
              if (item.producttype == 0) {
                return item.productid;
              }
            });
            this.adminArr = this.adminArr.filter(item => {
              return !(!item || item === "");
            });
            this.dailyManageMentArr = res.Data.map(item => {
              if (item.producttype == 1) {
                return item.productid;
              }
            });
            this.dailyManageMentArr = this.dailyManageMentArr.filter(item => {
              return !(!item || item === "");
            });
            // 回显tree
            this.$refs.tree.setCheckedKeys(this.adminArr);
            this.$refs.tree1.setCheckedKeys(this.dailyManageMentArr);
          }
        }
      );
    }
  },
  created() {
    this.userid = this.$route.query.userid;
  },
  mounted() {
    this.managementListLoad();
  }
};
</script>

<style lang="less" scoped>
.adminList {
  width: 250px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.adminType {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  padding-left: 20px;
}
</style>

