<template>
    <div class="AdministrationEdit">
        <el-form :model="fromData">
            <el-row>
                <el-col :span="9">
                    <el-form-item label="综合搜索" label-width="80px">
                      <el-input v-model="fromData.keyWord" placeholder="请输入关键字">
                          <el-button slot="append" icon="el-icon-search" @click="InputSearchClick"></el-button>
                      </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="产品名称" label-width="80px" >
                        <el-select style="width:100%;" @change="productChange" v-model="fromData.produceName" placeholder="请选择类型" >
                            <el-option-group
                                v-for="group in porductListOptions"
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
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    
                </el-col>
            </el-row>
        </el-form>
        <div class="tables">
            <template>
                <el-table
                    style="width: 100%"
                    :data="tableData"
                    height="400"
                    border
                >
                <el-table-column
                    fixed
                    label="名称"
                    align="center">
                        <template slot-scope="scope">
                            <a style="display:inline-block;color:#409EFF;" @click="fileDownLoadClick(scope.row)" href="javascript:;">{{scope.row.filename}}</a>
                            <!-- <el-button type="text" @click="smallBtnClick(scope.row)">{{scope.row.filename}}</el-button> -->
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
    </div>
</template>

<script>
export default {
  data() {
    return {
      fromData: {
        fileType: "",
        produceName: "",
        keyWord: ""
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
            }
          ]
        }
      ],
      porductListOptions: [],
      tableData: []
    };
  },
  methods: {
    //  数据加载
    filListLoad() {
      this.$get(`GetAsFilelistbyName?filename=${this.fromData.keyWord}`).then(res => {
        if (res.Code == 200) {
          for (let i = 0; i < res.Data.length; i++) {
            let data = new Date(res.Data[i].updatetime).Format("yyyy-MM-dd");
            res.Data[i].updatetime = data;
          }
          this.tableData = res.Data;
        }
      });
    },
    // 类型搜索
    fileTypeChange(val) {},
    // 产品下拉框数据加载
    produceListLoad() {
      this.$get(`GetAsProductlistWhere`).then(res => {
        let newArr = [];
        newArr = res.Data.map(item => {
          if (item.producttype == 2) {
            return item;
          }
        });
        newArr = newArr.filter(item => {
          return !(!item || item === "");
        });
        let obj = {};
        obj.options = [];
        //构造数据集合
        for (let i = 0; i < newArr.length; i++) {
          let optionsObj = {};
          optionsObj.value = newArr[i].id;
          optionsObj.label = newArr[i].productname;
          obj.options.push(optionsObj);
        }
        this.porductListOptions.push(obj);
      });
    },
    // 产品搜索
    productChange(val) {
      this.$get(`GetAsFilelistWhere?cond=pid&arg=${val}`).then(res => {
        if (res.Code == 200) {
          for (let i = 0; i < res.Data.length; i++) {
            let data = new Date(res.Data[i].updatetime).Format("yyyy-MM-dd");
            res.Data[i].updatetime = data;
          }
          this.tableData = res.Data;
        }
      });
    },
    // 文本搜索的点击事件
    InputSearchClick() {
      if (this.fromData.keyWord) {
        this.filListLoad();
      } else {
        this.$showErrorTip("请输入搜索内容");
      }
    },
    // 文件下载
    fileDownLoadClick(item) {
      // AsFileDownload?fileid=${item.fileid}&id=${item.id}
      window.location.href = `https://mt.guoanfamily.com/asmanage/AsFileDownload?fileid=${
        item.fileid
      }&id=${item.id}`;
    }
  },
  mounted() {
    this.produceListLoad();
  }
};
</script>

<style lang='less' scoped>
.AdministrationEdit {
  position: relative;
  height: 100%;
  overflow: auto;
  padding-top: 30px;
  .searchTop {
    width: 100%;
    height: 40px;
  }
}
.el-row {
  margin-bottom: 20px;
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
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
