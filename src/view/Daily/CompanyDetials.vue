<template>
    <div class="CompanyDetials">
        <!-- 面包屑 -->
        <div class="bread">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in breadArr" :key="index" :to="{path:item.path}">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 头部轮播图 -->
            <div class="page">
                <div class="device">
                    <div class="bigDiv" style="width:100%;height:100%;overflow:auto;">
                        <div class="block"  @click="chooseCarousel" style="border-bottom:1px solid #ccc;">
                            <el-carousel trigger="click"  height="207px" class="carousel" >
                                <el-carousel-item :key="index" v-for="(item,index) in bannerData.reportcontent">
                                        <img class="carousel-image" :src="item.imageUrl">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <!-- 文本编辑器 -->
                        <div @click="chooseTextEditor" ref="reference">
                            <div style="width:100%;height:40px;line-height:40px;font-size:16px;padding-left:10px;">文本编辑</div>
                            <editor style="border-radius:0;" v-if="!this.departname" @change='updateData'  :content="dailyInfoData.reportcontent" :height="140" :z-index="1000" :auto-height="true" :show-module-name="false"></editor>
                            <editor style="border-radius:0;" v-else @change='updateData' :content="dailyDepartData.departcontent" :height="140" :z-index="1000" :auto-height="true" :show-module-name="false"></editor>
                        </div>
                        <!-- <div style="width:100%;height:50px;;"></div> -->
                        
                    </div>
                </div>
            </div>
            <!-- 属性区部分 -->
            <div class="page1">
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
                    <el-card class="box-card" v-for="(item, index) in bannerData.reportcontent" :key="index">
                      <el-form label-width="80px" class="carousel-item">
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                :action="UPLOAD_IMAGE"
                                :data="{pid: '5'}"
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
                  <div v-if="formType === 'texteditor'" style="width:100%;height:30px;margin-top:60px;">
                        <el-button style="width:50%;" type="primary" @click="saveTextClick">保存</el-button>
                  </div>
                  <div style="width:100%;height:30px;">
                      <el-button style="width:50%;margin-top:20px;" type="primary" @click="saveAndBack">返回</el-button>
                  </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      breadArr: [
        { path: "/dailyFirst", name: "日报管理" },
        { path: "/companyDetials", name: "编辑日报" }
      ],
      dailyclass: this.$route.query.dailyclass,
      companyName: this.$route.query.companyName,
      departname: this.$route.query.departname,
      dateTime: "",
      // 轮播图集合
      bannerData: {
        id: null,
        companyname: "",
        reportdate: "",
        reporttype: 0,
        reportclass: "",
        reportcontent: []
      },
      dailyInfoData: {
        id: null,
        companyname: "",
        reportdate: "",
        reporttype: 1,
        reportclass: "",
        reportcontent: ""
      },
      dailyDepartData: {
        id: null,
        departname: "",
        reportdate: "",
        reporttype: 2,
        departcontent: ""
      },
      //   文本集合
      dailyInfo: "",
      //   属性区
      formType: "",
      // pidDtList: [], // 所有部门详细数据列表
    };
  },
  methods: {
    // 加载页面数据方法
    PageLoade() {
      this.$get(
        `GetAsDailybyDate?company=${this.companyName}&date=${this.dateTime}&class=${this.dailyclass}`
      ).then(res => {
        // console.log('res',res);
        if (res.Code == 200) {
          res.Data.forEach(item => {
            // 轮播
            if (item.reporttype == 0) {
              this.bannerData.id = item.id;
              this.bannerData.companyname = item.companyname;
              this.bannerData.reportdate = item.reportdate;
              this.bannerData.reporttype = item.reporttype;
              this.bannerData.reportclass = item.reportclass;
              this.bannerData.reportcontent = JSON.parse(item.reportcontent);
            }
           if (item.reporttype == 1) {
              this.dailyInfoData.id = item.id;
              this.dailyInfoData.companyname = item.companyname;
              this.dailyInfoData.reportdate = item.reportdate;
              this.dailyInfoData.reporttype = item.reporttype;
              this.dailyInfoData.reportclass = item.reportclass;
              this.dailyInfoData.reportcontent = item.reportcontent;
              this.getDepartList(item.id)
            }
          });
        }
      });
    },
    // 获取部门列表
getDepartList(id) {
    this.$get(
    `GetAsDailydepartByDatePid?d=${this.dateTime}&pid=${id}`
    ).then(res =>{
    if(res && res.Code === 200 && res.Data) {

      // this.pidDtList = res.Data
      if(res.Data.length !== 0) {
        for(var item of res.Data) {
          if(item.departname === this.departname) {
            this.dailyDepartData = item
          }
        }
      }
    }
    })
},
    // 轮播图的点击事件
    chooseCarousel() {
      this.formType = "carousel";
    },
    /*轮播图控制添加空元素*/
    addCarouselItem() {
      this.bannerData.reportcontent.push({
        imageUrl: "",
        linkUrl: ""
      });
    },
    // 上传轮播图图片方法
    handleAvatarSuccess(index, res, file) {
      this.bannerData.reportcontent[index].imageUrl = res.Data.link;
      this.bannerData.companyname = this.companyName;
      this.bannerData.reportclass = this.dailyclass;
      this.bannerData.reportdate = this.dateTime;
      let obj = this.dailyInfoData;
      this.bannerData.companyname = obj.companyname;
      this.bannerData.reportclass = obj.reportclass;
      this.bannerData.reportdate = obj.reportdate;
      this.submit(this.bannerData);
    },
    // 保存的公共方法
    submit(obj, dn) { // dn => detartname 用来判断是否部门保存
      obj.userid = sessionStorage.getItem("USER_ID");
      obj.userid = parseInt(obj.userid);
      if(obj.reporttype == 0){
          obj.reportcontent = JSON.stringify(obj.reportcontent);
      }
      if(dn) {
        this.dailyDepartData.departname = this.departname;
        this.dailyDepartData.reportdate = obj.reportdate;
         this.dailyDepartData.userid = parseInt(obj.userid);
        // this.dailyDepartData.departcontent = obj.reportcontent;
        this.$post(`AsDailydepartSave?cn=${this.companyName}&rc=${this.dailyclass}`, this.dailyDepartData).then(res => {
          if (res.Code == 200) {
            if (obj.reporttype == 0) {
              obj.departcontent = JSON.parse(obj.reportcontent);
            }
            // this.PageLoade();
            this.$showMsgTip(`保存成功`);
          }
        });
      }else {
        this.$post(`AsDailySave`, obj).then(res => {
          if (res.Code == 200) {
            if (obj.reporttype == 0) {
              obj.reportcontent = JSON.parse(obj.reportcontent);
            }
            // this.PageLoade();
            this.$showMsgTip(`保存成功`);
          }
        });
      }
    },
    addEventFn(){
      this.$refs.reference.querySelector(".content").addEventListener("paste", this.paste);
    },
    paste(oEvent){ 
      setTimeout(() => {
          // console.log(this.$refs.reference.querySelector(".content").innerhtm);
          var newText = this.$refs.reference.querySelector(".content").innerHTML;
          
           newText= newText.replace(/style="[^>]*"/g,"");
           
           newText= newText.replace(/face="[^>]*"/g,"");
           console.log(newText);
          //  newText= newText.replace(/class="[^>]*"/g,"");
          // newText = newText.replace(/(\r\n)|(\n)/g,'<br>');
          //  console.log(newText);

           if(this.departname) {
              this.dailyDepartData.departcontent = newText;
            }else {
              this.dailyInfoData.reportcontent = newText;
            }
      }, 10);
    
      

      //  var evt = document.createEvent("HTMLEvents");
      // evt.initEvent("onchange", false, true);      
      //  this.$refs.reference.querySelector(".content").dispatchEvent(evt);
      
    },
    updateData(data) {
      // console.log("data",data)
      if(this.departname) {
        this.dailyDepartData.departcontent = data;
      }else {
        this.dailyInfoData.reportcontent = data;
      }
       var newText =  this.dailyInfoData.reportcontent;
        // console.log('===',newText);
    },
    // 移除轮播图的图片
    removeCarouselItem(index) {
      this.bannerData.reportcontent.splice(index, 1);
      let obj = this.dailyInfoData;
      this.bannerData.companyname = obj.companyname;
      this.bannerData.reportclass = obj.reportclass;
      this.bannerData.reportdate = obj.reportdate;
      this.submit(this.bannerData);
    },
    // 保存按钮的点击事件
    saveClick() {
      // if(dn) {}
      let obj = this.dailyInfoData;
      this.bannerData.companyname = obj.companyname;
      this.bannerData.reportclass = obj.reportclass;
      this.bannerData.reportdate = obj.reportdate;
      this.submit(this.bannerData);
    },
    saveTextClick() {
      // 公司文本
      this.dailyInfoData.companyname = this.$route.query.companyName;
      this.dailyInfoData.reportclass = this.$route.query.dailyclass;
      this.dailyInfoData.reportdate = this.dateTime;
      this.submit(this.dailyInfoData, this.departname);
    },
    
  
    // 选择文本编辑属性
    chooseTextEditor() {
      this.formType = "texteditor";
    },
    //  返回
    saveAndBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.addEventFn();
    //   获取时间
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month <= 9) {
      month = "0" + parseFloat(month);
    }
    let day = date.getDate();
    let hours = date.getHours();
    // if(hours < 12) {
    //   day = day -1
    // }
    if(day <= 9){
      day = "0" + parseFloat(day);
    }
    
    this.dateTime = year + "-" + month + "-" + day;
    // console.log(this.dateTime)
    this.PageLoade();
  }
};
</script>

<style lang = 'less' scoped>
.CompanyDetials{
  height: 100%;
  overflow: auto;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
}
.bottomDiv {
  width: 100%;
  height: 45px;
  position: absolute;
  bottom: 10px;
  left: 0;
  text-align:left;
  line-height: 40px;
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
    height: auto;
    /* overflow: auto; */
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
        width: 100%;
        height: 40px;
        li {
          float: left;
          height: 40px;
          width: 20%;
          font-size: 13px;
          line-height: 40px;
          padding: 0 10px;
          position: relative;
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
        // background:red;
        line-height: 90px;
        text-align: center;
        border: 1px dotted #ccc;
        margin: 15px 1.65% 0 1.65%;
        &.companyActive {
          border-color: red;
          color: red;
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
  width: 100%;
  min-width: 350px;
  text-align: center;
  .box-card {
    margin: 10px;
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
}
</style>
