<template>
    <div class="AdministrationEdit">
        <!-- 行政内容管理编辑 -->
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in breadArr" :key="index" :to="{path:item.path}">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="content">
            <!-- 操作区 -->
            <div class="button_Box">
                 <el-button type="primary" @click="AddData">添加</el-button>
                 <el-button type="info" :disabled="SelectionChangeArr.length!=1" @click="EditData">编辑</el-button>
                 <el-button type="danger" @click="delectCLick">删除</el-button>
                 <el-button type="primary" @click="PushUp">批量导入</el-button>
                 <el-button type="info" @click="bacchExportClick">批量导出</el-button>
                <el-input
                    class="SearchInput"
                    placeholder="请输入文件名称"
                    v-model="lookUpInfo">
                    <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
                </el-input>
            </div>
            <!-- 表格 -->
            <div class="tables">
                <template>
                    <el-table
                        :data="tableData"
                        border
                        @selection-change="SelectionChange"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            align="center"
                            width="55">
                        </el-table-column>
                         <!-- prop="filename" -->
                        <el-table-column
                            fixed
                            label="名称"
                            align="center">
                             <template slot-scope="scope">
                                 <el-button type="text" @click="smallBtnClick(scope.row)">{{scope.row.filename}}</el-button>
                             </template>
                        </el-table-column>
                        <el-table-column
                            prop="filetype"
                            align="center"
                            label="类型">
                        </el-table-column>
                        <el-table-column
                            prop="updatetime"
                            align="center"
                            label="日期">
                        </el-table-column>
                        <el-table-column
                            prop="downloadcount"
                            label="下载量"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="星级"
                            width="180"
                            align="center">
                            <template slot-scope="scope">
                                <el-rate
                                    v-model="scope.row.rating"
                                    disabled
                                    text-color="#ff9900"
                                    score-template="{value}">
                                </el-rate>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </div>

            <!-- 弹窗 -->
            <el-dialog :title="titleName" v-if="dialogVisible" :visible.sync="dialogVisible" >
                <!-- 批量上传 -->
                <div v-show="titleName=='批量上传'" class="BatchUpload">
                    <el-upload
                        class="upload-demo"
                        drag
                        :data="{'pid':pid}"
                        :http-request="fileChange"
                        :action="UPLOAD_FILE"
                        :multiple="true"
                        :file-list="fileList"
                        :on-success="uploadSuccess"
                        >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </div>
                <div v-show="titleName=='添加'||this.titleName=='编辑'" class="formEdit">
                    <div style="width:500px;height:80%;margin-left:20px;;">
                        <div style="float:left;line-height:40px;margin-left:10px;">选择文件</div>
                        <!-- :data="{'pid':pid,'md5':Filemd5}" -->
                        <el-upload
                          class="upload-demo"
                          :data="dataObj"
                          :action="UPLOAD_FILE"
                          :http-request="fileChange"
                          :on-success="singleUpLoadSuccess"
                          :file-list="fileListArr">
                         <el-button class="btn-add" type="primary" icon="el-icon-plus" circle></el-button>
                        </el-upload>
                        <el-form style="margin-top:20px;" label-width="80px">
                          <el-form-item label="产品名称">
                            <el-input v-model="fromData.fileName" placeholder="文件名称"></el-input>
                          </el-form-item>
                          <el-form-item style="margin-top:20px;width:100%;" label="文件类型" >
                            <el-select v-model="fromData.fileType" placeholder="请选择" >
                                <el-option-group
                                    v-for="group in entryOptions"
                                    :key="group.label"
                                    :label="group.label">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="subClick">确 定</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      pid: 0,
      totalNum: 0,
      menuIndex: this.$store.state.attribute.menuBtnIndex,
      breadArr: [
        { path: "/managementEdit", name: "综合行政" },
        { path: "/AdministrationEdit", name: "内容管理" }
      ],
      lookUpInfo: "",
      tableData: [],
      SelectionChangeArr: [],
      formEdit: {
        name: ""
      },
      fileList: [], //上传文件列表
      fileListArr: [],
      currentPage: 1,
      dialogVisible: false,
      titleName: "",
      fromData: {
        fileName: "",
        fileType: ""
      },
      entryOptions: [
        {
          label: "",
          options: [
            {
              value: "1",
              label: "图片"
            },
            {
              value: "2",
              label: "文档"
            },
            {
              value: "3",
              label: "音频"
            },
            {
              value: "4",
              label: "视频"
            },
          ]
        }
      ],
      postFileType: "",
      post_data: {},
      resDataType:{},
      chunks:'',
      fileReader:null,
      blobSlice:null,
      spark:new SparkMD5.ArrayBuffer(),
      files:[],
      currentChunk:0,
      uploadeFileName:'',
      // Filemd5:'',
      dataObj:{
        pid:'',
        md5:'',
      }
    };
  },
  methods: {
    // 数据加载方法
    pageLoad(pid) {
      this.$get(`GetAsFilelistWhere?cond=pid&arg=${pid}`).then(res => {
        if (res.Code == 200) {
          for (let i = 0; i < res.Data.length; i++) {
            let data = new Date(res.Data[i].updatetime).Format("yyyy-MM-dd");
            res.Data[i].updatetime = data;
            if (res.Data[i].filetype == "png" || res.Data[i].filetype == "jpg") {
              res.Data[i].filetype = "图片";
            } else if (
              res.Data[i].filetype == "pdf" ||
              res.Data[i].filetype == "xls" ||
              res.Data[i].filetype == "doc" ||
              res.Data[i].filetype == "xlsx" ||
              res.Data[i].filetype == "txt" ||
              res.Data[i].filetype == "docx"
            ) {
              alert(1234);
              res.Data[i].filetype = "文档";
            } else if (
              res.Data[i].filetype == "MP3" ||
              res.Data[i].filetype == "mp3" ||
              res.Data[i].filetype == "wav" ||
              res.Data[i].filetype == "mid"
            ) {
              res.Data[i].filetype = "音频";
            } else if (
              res.Data[i].filetype == "avi" ||
              res.Data[i].filetype == "mp4" ||
              res.Data[i].filetype == "MP4" ||
              res.Data[i].filetype == "ram"
            ) {
              res.Data[i].filetype = "视频";
            }
          }

          this.tableData = res.Data;
          this.totalNum = res.Data.length;
        }
      });
    },
    
    // 批量文件上传成功回调
    uploadSuccess(res, file) {
      if ((res.Code = 200)) {
        let TypeArr = res.Data.Filename.split(".");
        let arr = TypeArr[TypeArr.length -1];
        let nameArr = res.Data.Filename.split('.');
        nameArr.splice(nameArr.length -1,1);
        let names = nameArr.join('.');
        var filetype = "";
        if (arr == "png" || arr == "jpg" || arr == "gif") {
          filetype = "图片";
        } else if (
          arr == "pdf" ||
          arr == "xls" ||
          arr == "xlsx" ||
          arr == "txt" ||
          arr == "doc" ||
          arr == "docx"
        ) {
          filetype = "文档";
        } else if (
          arr == "MP3" ||
          arr == "mp3" ||
          arr == "wav" ||
          arr == "mid"
        ) {
          filetype = "音频";
        } else if (
          arr == "avi" ||
          arr == "mp4" ||
          arr == "MP4" ||
          arr == "ram"
        ) {
          filetype = "视频";
        }
        let filename = '';
        let post_data = {
          id: 0,
          pid: parseInt(this.pid),
          filename: names,
          filetype: filetype,
          fileid: res.Data.Id,
          downloadcount: 0,
          rating: 0,
          createtime: res.Data.Createtime,
          updatetime: res.Data.Updatetime,
          deleted: 0
        };
        // this.$post("AsFilelistSave", post_data).then(res => {
        //   if (res.Code == 200) {
        //     this.$showMsgTip("上传成功");
        //   }
        // });
      }
    },
    // 上传的改变事件
    fileChange(file){
      this.currentChunk=0;
      this.files = file.file
      if(this.uploadeFileName == this.files.name){
        return false;
      }
      this.uploadeFileName = this.files.name;
      let chunkSize =2097152;
      this.chunks = Math.ceil(this.files.size / chunkSize);
      this.onFileload();
      this.loadNext();
    },
    loadNext() {
      let chunkSize =2097152;
      this.blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
      var start = this.currentChunk * chunkSize;
      var	end = ((start + chunkSize) >=  this.files.size) ? this.files.size : start + chunkSize;
      this.fileReader.readAsArrayBuffer(this.blobSlice.call(this.files, start, end));
    },
    onFileload(){
          this.fileReader = new FileReader();
          this.fileReader.onload = (e)=> {
            this.spark.append(e.target.result); // Append array buffer
            this.currentChunk++;
            if(this.currentChunk < this.chunks) {
                this.loadNext();
            } else {
              // this.Filemd5 = this.spark.end();
              // console.log( this.Filemd5);
              this.dataObj.pid = this.$route.query.pid;
              this.dataObj.md5 = this.spark.end();
              // console.log(this.dataObj);
              this.fromSubmitFn();
            }
          };
          this.fileReader.onerror = function() {
            console.log('oops, something went wrong.');
          };
    },
    // fromSub
    fromSubmitFn(){
        let data = new FormData()
        data.append("file", this.files)
        data.append("pid", this.dataObj.pid)
        data.append("md5",this.dataObj.md5);
      fetch(`https://mt.guoanfamily.com/asmanage/HbfileSave`,{
        method: 'post',
        dataType: "json",
        body: data
      }).then((res)=>{
        return res.json();
      }).then(res=>{
        if(this.titleName == '添加'){
          this.singleUpLoadSuccess(res,this.files);
        }else{
          this.uploadSuccess(res,this.files);
        }
        
      })
    },
    // 单一文件上传
    singleUpLoadSuccess(res, file) {
      if ((res.Code = 200)) {
         this.resDataType = res.Data;
        let TypeArr = res.Data.Filename.split(".");
        let arr = TypeArr[TypeArr.length - 1];
        // console.log('arr',arr);
        var filetype = "";
        let obj = {};
        obj.name = res.Data.Filename;
        obj.url = res.Data.url;
        this.fileListArr.push(obj);
        let nameArr = res.Data.Filename.split('.');
        nameArr.splice(nameArr.length -1,1);
        let names = nameArr.join('.');
        this.fromData.fileName = names;

        // this.fromData.fileType = arr[1];
        if (arr == "png" || arr == "jpg") {
          filetype = "图片";
          this.fromData.fileType  =  '图片';
        } else if (
          arr == "pdf" ||
          arr == "xls" ||
          arr == "doc" ||
          arr == "xlsx" ||
          arr == "txt" ||
          arr == "docx"
        ) {
          filetype = "文档";
          this.fromData.fileType  =  '文档';
        } else if (
          arr == "MP3" ||
          arr == "mp3" ||
          arr == "wav" ||
          arr == "mid"
        ) {
          filetype = "音频";
          this.fromData.fileType = '音频';
        } else if (
          arr == "avi" ||
          arr == "mp4" ||
          arr == "MP4" ||
          arr == "ram"
        ) {
          filetype = "视频";
          this.fromData.fileType = '视频';
        }
          this.post_data = {
            id: 0,
            pid: parseInt(this.pid),
            filename: this.fromData.fileName,
            filetype: this.fromData.fileType,
            fileid: res.Data.Id,
            downloadcount: 0,
            rating: 0,
            createtime: res.Data.Createtime,
            updatetime: res.Data.Updatetime,
            deleted: 0,
          };
      }
    },
    // 提交的点击事件
    subClick() {
      if (this.titleName == "编辑") {
        this.post_data = {
          id: this.SelectionChangeArr[0].id,
          pid: this.SelectionChangeArr[0].pid,
          filename: this.fromData.fileName,
          filetype: this.fromData.fileType,
          fileid: this.SelectionChangeArr[0].fileid,
          downloadcount: this.SelectionChangeArr[0].downloadcount,
          rating: this.SelectionChangeArr[0].rating,
          createtime: this.SelectionChangeArr[0].createtime,
          updatetime: this.SelectionChangeArr[0].updatetime,
          deleted: this.SelectionChangeArr[0].deleted
        };
        this.dialogVisible = false;
        this.fileListArr = [];
        this.fromData.fileName = "";
        this.fromData.fileType = "";
        this.$post("AsFilelistSave", this.post_data).then(res => {
          if (res.Code == 200) {
            this.$showMsgTip("保存成功");
            this.pageLoad(this.pid);
          }
        });
      }
      if(this.titleName == "添加"){
        this.dialogVisible = false;
        this.fileListArr = [];
        this.fromData.fileName = "";
        this.fromData.fileType = "";
        this.$post("AsFilelistSave", this.post_data).then(res => {
          if (res.Code == 200) {
            this.$showMsgTip("保存成功");
            this.pageLoad(this.pid);
          }
        });
      }
      if(this.titleName == '批量上传'){
         this.dialogVisible = false;
         this.fileList = [];
      }
      
    },
    // 文件下载
    smallBtnClick(item) {
      window.location.href = `https://mt.guoanfamily.com/asmanage/AsFileDownload?fileid=${
        item.fileid
      }&id=${item.id}`;
    },
    // 批量导出
    bacchExportClick() {
      window.location.href = `https://mt.guoanfamily.com/asmanage/AsFileExport?pid=${
        this.pid
      }`;
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    SelectionChange(val) {
      this.SelectionChangeArr = val;
    },
    // 批量上传按钮
    PushUp() {
      this.titleName = "批量上传";
      this.dialogVisible = true;
    },

    AddData() {
      this.titleName = "添加";
      this.dialogVisible = true;
    },
    // 搜索处理
    searchClick() {
      let pid = this.$route.query.pid;
      this.$get(
        `GetAsFilelistbyName?filename=${this.lookUpInfo}&pid=${pid}`
      ).then(res => {
        if (res.Code == 200) {
          for (let i = 0; i < res.Data.length; i++) {
            let data = new Date(res.Data[i].updatetime).Format("yyyy-MM-dd");
            res.Data[i].updatetime = data;
          }
          this.tableData = res.Data;
          this.totalNum = res.Data.length;
        }
      });
    },
    // 编辑按钮
    EditData() {
      this.fileListArr = [];
      if (this.SelectionChangeArr.length > 1) {
        this.$showMsgTip = "您只能选择一条记录";
        return false;
      }
      var obj = {};
      obj.name = this.SelectionChangeArr[0].filename;
      obj.url = "";
      this.fileListArr.push(obj);
      this.fromData.fileName = obj.name;
      this.fromData.fileType = this.SelectionChangeArr[0].filetype;
      this.titleName = "编辑";
      this.dialogVisible = true;
    },
    // 删除按钮
    delectCLick() {
      // 多条记录删除方法
       if (this.SelectionChangeArr.length == 0) {
        this.$showErrorTip("请选择要删除的记录");
        return false;
      }
      let arr = this.SelectionChangeArr.map(item=>{
        return item.id;
      })
      let ids = arr.join(',');
      this.$get(`AsFileBatchDelete?ids=${ids}`).then(res =>{
        if(res.Code == 200){
          this.$showMsgTip("删除成功");
          this.pageLoad(this.pid);
        }
      })
    },
    // 小编辑按钮
    EditLineData() {
      this.titleName = "编辑";
      this.dialogVisible = true;
    }
  },
  components: {},
  created() {
    this.pid = this.$route.query.pid;
    this.pageLoad(this.pid);
  },
  mounted() {},
  computed: {
    menuBtnIndex() {
      return this.menuIndex.id;
    },
    mdtNum(){
      
    }
  },
  watch: {
    menuBtnIndex() {
      this.pageLoad(this.menuIndex.id);
    },
  }
};
</script>

<style scoped lang="less">
.AdministrationEdit {
  position: relative;
  height: 100%;
  overflow: auto;
  padding-top: 30px;
}
.bread {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
}
.button_Box {
  padding: 10px;
  .SearchInput {
    width: 250px;
    float: right;
  }
}
.pag_ination {
  margin-top: 20px;
}
.BatchUpload {
  text-align: center;
}
.formEdit {
  //   width: 60%;
  text-align: center;
}
</style>
<style scoped>
.el-select {
  width: 100%;
}
</style>
