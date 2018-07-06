<template>
    <div class="AdministrationEdit">
        <div class="topInput">
            <el-input v-model="searchText" placeholder="请输入搜索内容" clearable>
                <el-button slot="append" icon="el-icon-search" @click="InputSearchClick"></el-button>
            </el-input>
        </div>
        <div class="width:100%;">
            <div :key="index" v-for="(item,index) in searchResultArr">
                <div>{{item.doc_title}}</div>
                <div v-html="item.createtime + item.text"></div>
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
      }
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
    width:100%;
    height:40px;
}
</style>
