<template>
    <div>
        <!-- 头部搜索栏 -->
        <div class="select-block">
            <el-input
                class="search-input"
                placeholder="请输入内容"
                v-model="searchText"
                clearable>
            </el-input>
            <el-button icon="el-icon-search" type="primary" circle @click="managementSarch"></el-button>
        </div>
        <!-- 中间列表部分 -->
        <div class="managementList">
            <div class="list-item" v-for="item in managementData" :key="item.id">
                <div class="management-item">
                     {{item.productname}}
                    <div class="hover-content" @click="doEdit(item.id)">
                            <div class="btn-box">
                                <el-tooltip class="item" effect="dark" content="发布" :enterable="false" placement="top">
                                    <el-button icon="el-icon-upload" type="primary" circle 
                                    @click.stop.prevent="doRelease(item.id)"></el-button>
                                </el-tooltip>
                            </div>

                            <div class="btn-box">
                                <el-tooltip class="item" effect="dark" content="预览" :enterable="false" placement="top">
                                    <el-button icon="el-icon-view" type="success" circle
                                     @click.stop.prevent="doPreview(item.id)"></el-button>
                                </el-tooltip>
                            </div>

                            <div class="btn-box">
                                <el-tooltip class="item" effect="dark" content="复制" :enterable="false" placement="top">
                                    <el-button icon="el-icon-document" type="warning" circle
                                    @click.stop.prevent="doCopy(item.id)"></el-button>
                                </el-tooltip>
                            </div>

                            <div class="btn-box">
                                <el-tooltip class="item" effect="dark" content="删除" :enterable="false" placement="top">
                                    <el-button icon="el-icon-delete" type="danger" circle
                                    @click.stop.prevent="doDelete(item.id)"></el-button>
                                </el-tooltip>
                            </div>
                    </div>
                </div>
                <p class="tips">点击空白处编辑</p>
            </div>
        </div>
        <footer style="text-align:center;">
            <el-button type="success" @click="addDialogVisible = true">新增内容</el-button>
        </footer>
        <!--新增提示框-->
        <el-dialog
            title="新增会议"
            :visible.sync="addDialogVisible"
            width="30%"
        >
            <el-form label-width="80px">
                <el-form-item label="会议名称">
                    <el-input
                        class="add-input"
                        placeholder="请输入会议名称"
                        v-model="managementName"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="doAdd" :disabled="!managementName">确 定</el-button>
            </span>
        </el-dialog>
        <!--预览提示框-->
        <preview :previewDialogVisible="previewDialogVisible" :url="previewUrl" @close="previewDialogVisible = false"/>
    </div>
</template>

<script>
import preview from "../../components/Preview";
export default {
  components: {
    preview
  },
  data() {
    return {
      searchText: "",
      managementData: [],
      addDialogVisible: false,
      managementName: "",
      previewDialogVisible: false,
      previewUrl: ""
    };
  },
  methods: {
    //   搜索
    managementSarch(){
        let searchUrl = `GetAsProductlistWhere?cond=productname&arg=${this.searchText}`
        this.$get(searchUrl).then(res => {
          this.managementData = res.Data;
      });
    },
    //   列表内容加载
    managementListLoad() {
      this.$get(`GetAsProductlistWhere`).then(res => {
          this.managementData = res.Data;
      });
    },
    //   点击列表空白处跳转的点击事件
    doEdit(id) {
        console.log(id);
      // this.$router.push(`managementEdit?mid=${id}`)
      this.$router.push({ path: "/managementEdit", query: { mid: id } });
    },
    //   发布的点击事件
    doRelease(id) {},
    // 预览的点击事件
    doPreview(id) {
      this.previewDialogVisible = true;
      this.previewUrl = `#/?id=${id}&uid=${this.$getSession(
        this.KEYS.USER_ID
      )}`;
    },
    // 复制的点击事件
    doCopy(id) {},
    // 删除的点击事件
    doDelete(id) {},
    // 新增弹窗确定的点击事件
   doAdd() {
       let post_data = {
            "productorder": 0,//底部顺序
            "productname": this.managementName,
            "producticon": "",
            "producttype": 0,
            "productclass": "C组",
            "productprop": "",
            "userid": sessionStorage.getItem('USER_ID'),
       }
    //    创建内容
      this.$post(`AsProductlistSave`,post_data).then(res=>{
         if(res.Code == 200){
            this.$showMsgTip(`创建成功`);
            this.addDialogVisible = false;
            this.$router.push({ path: "/managementEdit", query: { mid: res.Data}});
            //  this.managementListLoad();
         }
      })
      
    }
  },
  created() {
    this.managementListLoad();
  },
  mounted() {}
};
</script>

<style scoped>
.select-block {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.search-input {
  width: 200px;
  margin-right: 40px;
}
.managementList {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  padding-top: 20px;
  margin: 0 -20px 0 -20px;
}
.list-item {
  width: 200px;
  margin: 0 20px 20px 20px;
}
.management-item {
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  height: 200px;
  /* margin: 0 20px 20px 20px;*/
  position: relative;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tips {
  font-size: 14px;
  color: #fff;
  text-align: center;
  padding: 5px;
  transition: 0.5s;
}

.list-item:hover .tips {
  color: #409eff;
}

.management-item:hover > .hover-content {
  top: 0;
}

.hover-content {
  border-radius: 10px;
  transition: 0.3s;
  position: absolute;
  height: 100%;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
}

.hover-content > .btn-box {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-input {
  width: 100%;
}
</style>
