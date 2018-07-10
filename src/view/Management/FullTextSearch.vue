<template>
    <div class="AdministrationEdit">
        <div class="topInput">
            <el-input v-model="searchText" placeholder="请输入搜索内容" clearable>
                <el-button slot="append" icon="el-icon-search" @click="InputSearchClick"></el-button>
            </el-input>
        </div>
        <div style="width:85%;top: 140px;position: fixed;height: 450px;overflow: auto;">
            <div style="width:95%;height:auto;" :key="index" v-for="(item,index) in searchResultArr"  @click="searchDownloadClick(item)">
                <div class="searchTitle">{{item.doc_title}}</div>
                <div class="searchContent" v-html="item.text"></div>
                <div class="searchTime">{{item.createtime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        searchText:'',
        searchResultArr:[],
    };
  },
  methods:{
    //   搜索数据
      InputSearchClick(){
        if (this.searchText) {
            // fullsearch?query=主题词
            this.$get(`fullsearch?query=${this.searchText}`).then(res => {
                // console.log(res);
                if(res.Code == 200){
                    this.searchResultArr = res.Data;
                }
            })
            
        } else {
            this.$showErrorTip("请输入搜索内容");
        }
      },
    //   点击下载
      searchDownloadClick(item){
          window.location.href = item.doc_link;
      },
   
  },
  mounted(){
    
  }
};
</script>

<style lang = 'less' scoped>
.AdministrationEdit{
    position: relative;
    height: 100%;
    overflow: auto;
    padding-top: 20px;
}
.topInput{
    width:50%;
    height:40px;
    position: fixed;
    left: 35%;
}
.searchTitle{
    width:85%;
    font-size: 18px;
    line-height: 40px;
    font-weight: 500;
    color: #000;
    margin-top: 20px;
}
.searchContent{
    
    width:85%;
    line-height: 30px;
    font-size: 16px;
}
.searchTime{
    width:85%;
    line-height: 20px;
    font-size: 14px;
    color: #2518e2;
}
</style>
