<template>
     <div class="page">
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
                <el-card class="box-card" v-for="(item, index) in carouselArray" :key="index">
                    <el-form label-width="80px" class="carousel-item">
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                :action="UPLOAD_IMAGE"
                                :data="{pid: '111'}"
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
                            <el-input v-model="carouselArray[index].linkUrl" placeholder="请输入跳转链接"></el-input>
                        </el-form-item>
                        <!-- 删除图片按钮 -->
                        <el-button class="btn-remove" type="danger" icon="el-icon-delete" circle
                            @click="removeCarouselItem(index)"></el-button>
                    </el-form>
                </el-card>
                <!-- 轮播底部增加图片按钮 -->
                <div class="carousel-bottom">
                    <el-button class="btn-add" type="primary" icon="el-icon-plus" circle
                               @click="addCarouselItem"></el-button>
                </div>
            </div>
            <!-- 属性区 -->
            <div v-if="formType === 'manage'">
                <el-card class="box-card">
                    <el-form label-width="80px">
                        <el-form-item label="图片">
                            <el-upload
                                class="avatar-uploader"
                                :action="UPLOAD_IMAGE"
                                :data="{pid: manageMent.id}"
                                :show-file-list="false"
                                :on-success="handleEntrySuccess"
                            >
                                <img v-if="manageMent.producticon" :src="manageMent.producticon" class="avatar" alt="">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-button class="btn-remove" type="danger" icon="el-icon-delete" circle
                                @click="pageLoad"   ></el-button>
                        </el-form-item>
                        <el-form-item label="产品名称">
                            <el-input v-model="manageMent.productname" placeholder="请输入产品名称"></el-input>
                        </el-form-item>
                        <el-form-item label="按钮顺序">
                            <el-input v-model="manageMent.productorder" placeholder="请输入按钮顺序"></el-input>
                        </el-form-item>
                        <el-form-item label="管理人">
                            <el-input v-model="manageMent.username"  @keyup.native.enter="searchClick" placeholder="输入姓名或电话搜索">
                                  <el-button @click="searchClick" slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </el-form-item>
                        <template>
                          <div v-show="tableShow" style="width:100%;margin-left:14%;">
                           <el-table
                            ref="singleTable"
                            :data="tableData"
                            max-height="200"
                            highlight-current-row
                            @current-change="handleCurrentChange"
                            style="text-align:center;">
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
                              header-align='center'
                              label="姓名"
                              width="80">
                            </el-table-column>
                            <el-table-column
                              property="phone"
                              header-align='center'
                              label="电话"
                              width="120">
                            </el-table-column>
                           </el-table>
                          </div>
                        </template>
                        <div class="bigdiv" style='position:relative;'>
                          <el-tooltip content="添加授权可拥有编辑权限" placement="top">
                            <div class="showquan">授权人</div>
                          </el-tooltip>
                          <el-form-item style="margin-top:20px;width:100%;" label="编辑授权">
                              <el-input v-model="namePhone" @keyup.native.enter="search1Click" placeholder="输入姓名或电话搜索">
                                    <el-button @click="search1Click" slot="append" icon="el-icon-search"></el-button>
                              </el-input>
                              <template>
                                <div style="width:100%;border:1px solid #ccc;border-radius:3px;height:170px;margin-top:20px;overflow-y:scroll;">
                                  <el-tag closable style="width:80%;"  @close="handleClose(item)" :key="index" v-for="(item,index) in allPeopleArr" type="info">{{item.name}}</el-tag>
                                </div>
                              </template>
                              
                              <!-- <div v-show="tableShow1" style="width:100%;margin-top:20px;"> -->
                              <div v-show="tableShow1" style="position: absolute;top: 65px;left: 1%;width: 97%">
                                <el-table
                                ref="singleTable"
                                :data="tableData1"
                                max-height="150"
                                highlight-current-row
                                @current-change="handleCurrentChangeOne"
                                style="width: 100%;text-align:center;">
                                <el-table-column
                                  type="index"
                                  header-align='center'
                                  width="50">
                                </el-table-column>
                                <el-table-column
                                  property="shortname"
                                  header-align='center'
                                  label="公司简称"
                                  width="80">
                                </el-table-column>
                                <el-table-column
                                  property="name"
                                  header-align='center'
                                  label="姓名"
                                  width="80">
                                </el-table-column>
                                <el-table-column
                                  property="phone"
                                  header-align='center'
                                  label="电话"
                                  width="120">
                                </el-table-column>
                                </el-table>
                                <!-- <el-button style="width:50%;margin:10px auto;" type="primary" size="small" @click='completeClick'>完成</el-button> -->
                              </div>
                          </el-form-item>
                        </div>
                        <!-- 限制查看开关按钮 -->
                        <template>
                          <div style="width:100%;height:40px;text-align: left;line-height: 40px;padding-left: 10px">
                            <el-switch
                              v-model="modelCheck"
                              @change="onChange"
                              inactive-text="限制查看">
                            </el-switch>
                          </div>
                        </template>
                        <!-- 增加外链开关按钮 -->
                        <template>
                          <div  style="width:100%;height:40px;text-align: left;line-height: 40px;padding-left: 10px">
                            <el-switch
                              v-model="linkCheck"
                              @change="linkChange"
                              inactive-text="添加外链">
                            </el-switch>
                          </div>
                        </template>
                        <el-form-item v-show="linkCheck" class="btnContent" style="margin-top:20px;margin-left:0;width:100%;" >
                          <template>
                            <div style="width:100%;border:1px solid #ccc;border-radius:3px;float:right;overflow-y:scroll;">
                                <div class="btngroup" :key="index" v-for="(item,index) in btnArr">                                
                                  <div style="width:13%;height:40px;float:left;border-radius:4px;border: 1px solid #dcdfe6;">
                                    <el-tooltip content="点击添加或修改图片" placement="top">
                                      <el-upload
                                        class="avatar-uploader"
                                        :action="UPLOAD_IMAGE"
                                        :data="{pid: manageMent.id}"
                                        :show-file-list="false"
                                        :on-success="(...arr) =>{
                                          BtnEntrySuccess(index,...arr)
                                        }"
                                      >
                                        <img style="width:45%;margin-top:2px;" v-show="item.btnImgurl !==''" :src="item.btnImgurl"  alt="">
                                        <i v-show="item.btnImgurl==''" class="el-icon-plus avatar-uploader-icon"></i>
                                      </el-upload>
                                      </el-tooltip>
                                  </div>
                                  <el-input style="width:25%;float:left;margin-left:2%;" v-model="item.btnName" placeholder="按钮名称"></el-input>
                                  <el-input style="width:50%;margin-left:2%;float:left;" @change="complatClick(item)" v-model="item.btnLinkUrl" placeholder="跳转连接">              
                                  </el-input>
                                  <el-button style="width:5%;float;right;padding:0;border:0;" @click="deleteClick(index)" slot="append" icon="el-icon-close"></el-button>
                                </div>
                            </div>
                          </template>
                        </el-form-item>
                        <el-form-item style="margin-top:20px;width:100%;" label="类型" >
                            <el-select v-model="manageMent.producttype" placeholder="请选择" @change="changEntryType1">
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
                        <!--外部链接-->
                        <template v-if="manageMent.producttype == '外部链接'">
                            <el-form-item label="链接地址">
                                <el-input v-model="linkUrl" placeholder="请输入链接"></el-input>
                            </el-form-item>
                        </template>
                        <!--内容-->
                        <template>
                            <el-button style="width:44%;height:40px;" v-show="manageMent.producttype == '内容'" type="primary" size="small" @click="editFileClick">编辑</el-button>
                        </template>
                    </el-form>
                </el-card>
            </div>
            <!-- 新标题 -->
            <div v-if="formType === 'newTitle'">
                    <el-form>
                    <el-form-item label="标题名称">
                        <el-input :disabled="true" v-model="titleName" placeholder="请输入标题名称"></el-input>
                    </el-form-item>
                    <el-form-item  label="新标题名称">
                        <el-input v-model="newTitle" placeholder="请输入标题名称"></el-input>
                    </el-form-item>
                    </el-form>
            </div>
            <!-- 按钮跳转部分属性 -->
            <div v-if="formType === 'btnLink'">
              
                <el-form style="margin-top:10px;">
                <el-form-item label="按钮一" >
                    <el-select v-model="btnSelectVal.one" placeholder="请选择" @change="selectChange()">
                        <el-option-group
                            v-for="group in btnSelect"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                </el-form>
                
                <el-form style="margin-top:10px;">
                <el-form-item label="按钮二" >
                    <el-select v-model="btnSelectVal.two" placeholder="请选择" @change="selectChange()">
                        <el-option-group
                            v-for="group in btnSelect"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                </el-form>
               
                <el-form style="margin-top:10px;">
                <el-form-item label="按钮三" >
                    <el-select v-model="btnSelectVal.three" placeholder="请选择" @change="selectChange()">
                        <el-option-group
                            v-for="group in btnSelect"
                            :key="group.label"
                            :label="group.label">
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                </el-form>
                <el-form>
                    <el-form-item label="关于我们">
                         <el-button style="width:40%;height:40px;margin-right:70px;" type="primary" size="small" @click= 'exitClcik'>编辑</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div v-if="formType" style="width:100%;height:30px;margin-top:20px;">
                <el-button style="width:40%;" type="primary" @click="saveClick">保存</el-button>
            </div>
     </div>
</template>

<script>
export default {
  data() {
    return {
      mid: this.$route.query.mid,
      newTitle: "",
      namePhone: "", //搜索的姓名或者电话
      tableData: [], //筛选出来的数组
      tableData1:[],
      tableShow: false,
      tableShow1:false,
      linkUrl:'',//外链地址
      userid: "", //管理人员的id
      allPeopleArr:[],//授权人数组
      modelCheck:'',//限制查看
      linkCheck:false,//添加按钮外链地址
      btnArr:[{btnImgurl:'',btnName:'',btnLinkUrl:''}],
      entryOptions: [
        {
          label: "",
          options: [
            {
              value: "1",
              label: "外部链接"
            },
            {
              value: "2",
              label: "内容"
            }
          ]
        }
      ],
      // BtnArrTmp:[],
    };
  },
  methods: {
    // 按钮外链上传图片的点击事件
    BtnEntrySuccess(index,res,file,){
      this.btnArr[index].btnImgurl = res.Data.link;
    },
    //按钮外链完成的点击事件
    complatClick(item){
      if(item.btnLinkUrl.indexOf('http') == -1){
        this.$showErrorTip('请输入完整的连接');
        return false;
      }
      let obj ={};
      obj.btnName = item.btnName;
      obj.btnLinkUrl = item.btnLinkUrl;
      if(this.btnArr.length < 4){
        this.btnArr.push(obj);
        this.btnArr[this.btnArr.length-1].btnName = "";
        this.btnArr[this.btnArr.length-1].btnLinkUrl = "";
        this.btnArr[this.btnArr.length-1].btnImgurl =  "";
        this.manageMent.productprop.btnLinkArr = this.btnArr
      }
    },
    // 删除
    deleteClick(index){
      if(this.btnArr.length != 1){
        this.btnArr.splice(index,1);
        this.manageMent.productprop.btnLinkArr = this.btnArr
      }else{
        this.btnArr[0].btnName = "";
        this.btnArr[0].btnLinkUrl = "";
        this.btnArr[0].btnImgurl =  "";
        this.manageMent.productprop.btnLinkArr = this.btnArr
      }
    },
    // 按钮排序
    selectChange(){
      let newArr = [];
      let ListArr = this.BtnArrTmp;
      ListArr.forEach(element => {
          if(element.DataTitle == this.btnSelectVal.one){
            newArr[0]=element;
          }
          if(element.DataTitle == this.btnSelectVal.two){
            newArr[1]=element;
          }
          if(element.DataTitle == this.btnSelectVal.three){
            newArr[2]=element;
          }
      });
      this.$store.state.attribute.managementArr = newArr;
    },
    // 删除产品之前的认证，如果产品有内容，提示按层级删除
    pageLoad() {
      this.$get(`GetAsFilelistWhere?cond=pid&arg=${this.manageMent.id}`).then(
        res => {
          if (res.Code == 200) {
            if (res.Data.length > 0) {
              this.$showMsgTip("请您先删除产品中的文件");
            } else {
              this.deleteImgClik();
            }
          }
        }
      );
    },
    //   删除产品的点击事件
    deleteImgClik() {
      this.manageMent.producticon = "";
      this.manageMent.productclass = "";
      this.manageMent.productname = "";
      this.manageMent.productorder = "";
      this.manageMent.producttype = [];
      this.manageMent.username = "";
      this.deleteFn(this.manageMent);
    },
    // 删除的公共方法
    deleteFn(obj) {
      obj.userid = sessionStorage.getItem("USER_ID");
      obj.userid = parseInt(obj.userid);
      obj.productprop = JSON.stringify(obj.productprop);
      //   obj.producttype = parseInt(obj.producttype);
      //   obj.productorder = parseInt(obj.productorder);
      this.$post(`AsProductlistDelete`, obj)
        .then(res => {
          if (res.Code == 200) {
            this.$store.state.attribute.objectType = '';
            this.$showMsgTip(`删除成功`);
          }
        })
        .then(() => {
          this.$emit("refreshLis");
        });
    },
    // 搜索的点击事件
    searchClick() {
      if(this.manageMent.username == ''){
        this.$showErrorTip('搜索关键字不能为空');
        return  false;
      }
      this.tableData = [];
      this.$get(`GetYunUserSearch?value=${this.manageMent.username}`).then(
        res => {
          if (res.Code == 200) {
            this.tableData = res.Data;
            this.tableShow = true;
          }
        }
      );
    },
    // 编辑授权的点击事件
    search1Click(){
      if(this.namePhone == ''){
        this.$showErrorTip('搜索关键字不能为空');
        return  false;
      }
      this.tableData1 = [];
      this.$get(`GetYunUserSearch?value=${this.namePhone}`).then(
        res => {
          if (res.Code == 200) {
            this.tableData1 = res.Data;
            this.tableShow1 = true;
          }
        }
      );
    },
    // 限制查看开关的点击事件
    onChange(val) {
      if(val){
        this.manageMent.needauth = 1;
      }else{
        this.manageMent.needauth = 0;
      }
    },
    // 添加按钮连接的点击事件
    linkChange(val){
      this.manageMent.productprop.btnSwith = true;
    },
    // 筛选出来的表格的点击事件
    handleCurrentChange(val) {
      if (val) {
        this.manageMent.username = val.name;
        this.tableShow = false;
        this.userid = val.id;
      }
    },
    // tag的移除事件
    handleClose(tag){
      for(let i = 0;i<this.allPeopleArr.length;i++){
        if(tag.name == this.allPeopleArr[i].name){
          this.allPeopleArr.splice(i,1);
        }
      }
    },
    //授权表格的点击事件
    handleCurrentChangeOne(val){
      // if(this.tableData1.length>1){
          if(val){
             this.tableShow1 = false;
          var obj = {};
          obj.name = val.name;
          obj.id = val.id;
          this.allPeopleArr.push(obj);
          let obj2 = {};
          let types = typeof(this.manageMent.productprop)
          if(types == "string"){
            obj2 = JSON.parse(this.manageMent.productprop);
          }else{
            obj2 = this.manageMent.productprop;
          }
          
          obj2.allPeopleArr=this.allPeopleArr;
          this.manageMent.productprop = JSON.stringify(obj2);
        // }
      }
      
    },
    // 完成的点击事件
    completeClick(){
      this.tableShow1 = false;
      if(this.tableData1.length == 1){
          var obj = {};
          obj.name = this.tableData1[0].name;
          obj.id = this.tableData1[0].id;
          this.allPeopleArr.push(obj);
          let obj2 = {};
          let types = typeof(this.manageMent.productprop)
          if(types == "string"){
            obj2 = JSON.parse(this.manageMent.productprop);
          }else{
            obj2 = this.manageMent.productprop;
          }
            
          obj2.allPeopleArr=this.allPeopleArr;
          this.manageMent.productprop = JSON.stringify(obj2);
      }
      
    },
    //   编辑的点击事件
    editFileClick() {
      let id = this.manageMent.id;
      this.saveClick();
      this.$router.push({
        path: "/AdministrationEdit",
        query: { pid: id }
      });
    },
    // 关于我们点击编辑的点击事件
    exitClcik() {
      this.$router.push({ path: "/aboutUs" });
    },
    changEntryType1(val) {
      // console.log(val);
      if (val == 2) {
        this.manageMent.producttype = "内容";
      } else {
        this.manageMent.producttype = "外部链接";
      }
    },
    handleAvatarSuccess(index, res, file) {
      this.carouselArray[index].imageUrl = res.Data.link;
      // this.$store.state.attribute.LoadBanner.id = 0;
      this.submit(this.$store.state.attribute.LoadBanner);
    },
    // 图片上传
    handleEntrySuccess(res, file) {
      this.manageMent.producticon = "";
      this.manageMent.producticon = res.Data.link;
    },
    /*轮播图控制*/
    addCarouselItem() {
      this.carouselArray.push({
        imageUrl: "",
        linkUrl: ""
      });
    },
    // 移除轮播图的图片
    removeCarouselItem(index) {
      this.carouselArray.splice(index, 1);
      this.submit(this.$store.state.attribute.LoadBanner);
    },
    // 新建的移除文件列表事件
    removeFile(file, fileList) {
      this.newManagent.productprop.fileList = this.Managent.productprop.fileList.filter(
        item => {
          return !item.name.includes(file.name);
        }
      );
    },
    // 修改的移除文件列表事件
    removeFile1(file, fileList) {
      this.manageMent.productprop.fileList = this.manageMent.productprop.fileList.filter(
        item => {
          return !item.name.includes(file.name);
        }
      );
    },
    // 保存公共方法
    submit(obj) {
      // obj.userid = sessionStorage.getItem("USER_ID");
      // obj.userid = parseInt(obj.userid);
      obj.userid = parseInt(this.userid);
      obj.productprop = JSON.stringify(obj.productprop);
      obj.producttype = parseInt(obj.producttype);
      if (obj.productorder) {
        obj.productorder = parseInt(obj.productorder);
      }
      this.$post(`AsProductlistSave`, obj).then(res => {
        if (res.Code == 200) {
          obj.productprop = JSON.parse(obj.productprop);
          obj.producttype = parseFloat(obj.producttype);
          if (obj.producttype == 2) {
            obj.producttype = "内容";
          } else if (obj.producttype == 1) {
            obj.producttype = "外部链接";
          }
          this.$emit("refreshLis");
          this.$showMsgTip(`保存成功`);
        }
      });
    },
    // 标题修改
    modifyTitle() {
      this.$get(
        `RenameProductClass?newname=${this.newTitle}&oldname=${this.titleName}`
      ).then(res => {
        
        if (res.Code == 200) {
          //   this.titleName = this.newTitle;
          this.$store.state.attribute.managementArr[
            this.$store.state.attribute.choosManIndex
          ].DataTitle = this.newTitle;
          this.$showMsgTip("修改成功");
        }
      });
    },
    // 保存的点击事件
    saveClick() {
      if (this.formType == "carousel") {
        let obj = this.$store.state.attribute.LoadBanner;
        this.submit(obj);
      }
      if (this.newTitle) {
        this.modifyTitle();
      }
      if (this.formType == "manage") {
        let obj = this.manageMent;
        if(obj.username == ''){
          this.$showErrorTip('请选择管理人');
          return false;
        }
        if (obj.producttype == "内容") {
          obj.producttype = 2;
        } else {
          obj.producttype = 1;
        }
        // console.log('==============',typeof(obj.productprop));
        let objType = typeof(obj.productprop)
        if(objType == 'string'){
          obj.productprop = JSON.parse(obj.productprop);
          obj.productprop.allPeopleArr =  this.allPeopleArr;
          obj.productprop.linkUrl = this.linkUrl;
        }else{
          obj.productprop.allPeopleArr =  this.allPeopleArr;
          obj.productprop.linkUrl = this.linkUrl;
          this.btnArr = this.btnArr.filter(item=>{
              return !(!item.btnName || item.btnName === "");
          });
          if(this.btnArr.length > 0){
            obj.productprop.btnLinkArr = this.btnArr;
          }
          obj.productprop.btnSwith =  this.linkCheck;
        }
        obj.productclass = this.titleName;
        
        this.submit(obj);
      }
      if (this.formType == "btnLink") {
        let obj = this.$store.state.attribute.footerList;
        obj.producttype = 3;
        this.submit(obj);
      }
    }
  },
  created() {},
  mounted() {
    
    // console.log('123423',this.$store.state.attribute.managementArr);
    // this.$store.state.attribute.managementArr.forEach(item=>{
    //   this.BtnArrTmp.push(item);
    // })
    //  console.log('12245',this.BtnArrTmp);
  },
  computed: {
    BtnArrTmp(){
       let arr = [];
       this.$store.state.attribute.shortArr.forEach(item=>{
          arr.push(item);
        })
        return arr;
    },
    formType() {
      // console.log('123423',this.$store.state.attribute.objectType);
      return this.$store.state.attribute.objectType;
    },
    // 获取轮播图的数据
    carouselArray() {
      return this.$store.state.attribute.LoadBanner.productprop;
    },
    // 获取当前点击的列表的数据
    manageMent() {

       //  控制搜索的表格的显示和隐藏
      this.tableShow = false;
      this.btnArr =  [];
      let obj = {};
      obj.btnName = '';
      obj.btnLinkUrl = '';
      obj.btnImgurl = '';
      this.btnArr.push(obj);
      this.userid=this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex].userid;
      let isAdmiId = this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
      ].DataVal[this.$store.state.attribute.chooseLableIndex];
      // 处理数据结构
      if(!isAdmiId.productprop){
        this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop = {};
        // 构造指定数据结构
        this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.allPeopleArr = [];
        this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.linkUrl = '';
        this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop = JSON.stringify(this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop)
      }
      let productpropType = typeof(this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop)
      if(productpropType == 'string'){
        this.allPeopleArr = JSON.parse(this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop).allPeopleArr;
        
        this.linkUrl = JSON.parse(this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop).linkUrl;
      }else{
        // 管理人
        this.allPeopleArr = this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.allPeopleArr;
        // 跳转地址
        this.linkUrl = this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.linkUrl;
        // 按钮跳转数据
        // 按钮开关
        if(this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.btnSwith){
            this.linkCheck = this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.btnSwith
        }else{
          this.linkCheck = false;
        }
        // 按钮数组
        if(this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.btnLinkArr){
          this.btnArr = this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
          ].DataVal[this.$store.state.attribute.chooseLableIndex].productprop.btnLinkArr;
          if(this.btnArr[this.btnArr.length - 1].btnName && this.btnArr.length<4){
            let obj = {};
            obj.btnImgurl = '';
            obj.btnName = '';
            obj.btnLinkUrl = '';
            this.btnArr.push(obj);
          }
        }else{
          this.btnArr = this.btnArr;
        }
      }
      if(isAdmiId.needauth == 0){
        this.modelCheck = false;
      }else{
        this.modelCheck = true;
      }
      if (!isAdmiId) {
        let childObj = {};
        childObj.id = "";
        childObj.producticon = ""; //图片
        childObj.productorder = 0; //顺序
        childObj.productclass = ""; //类名
        childObj.producttype = ""; //类型
        childObj.productclass = ""; //名称
        childObj.productprop = {}; //数据集
        childObj.productprop.allPeopleArr = [];
        childObj.productprop.linkUrl = '';
        childObj.username = ""; //管理人姓名
        return childObj;
      } else {
        return this.$store.state.attribute.managementArr[
          this.$store.state.attribute.choosManIndex
        ].DataVal[this.$store.state.attribute.chooseLableIndex];
      }
    },
    // 获取title的名称
    titleName() {
      return this.$store.state.attribute.managementArr[
        this.$store.state.attribute.choosManIndex
      ].DataTitle;
    },
    // 获取下拉选择
    btnSelect() {
      return this.$store.state.attribute.selectOption;
    },
    // 下拉的值
    btnSelectVal() {
      return this.$store.state.attribute.footerList.productprop;
    },
    // 获取新建的属性
    newManagent() {
      return this.$store.state.attribute.newMangeMentList;
    }
  }
};
</script>

<style scoped lang= 'less'>
.page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 20px;
  max-width: 600px;
  width: 100%;
  min-width: 350px;
  text-align: center;
  height: 450px;
  overflow-y: auto;
  border:1px solid #000;
  padding-bottom: 10px;
}
.box-card {
  margin: 10px;
}
.carousel-item {
  position: relative;
  padding-right: 100px;
}

.carousel-bottom {
  margin: 40px 0;
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
.btngroup{
  width:98%;
  margin-left:2%;
  margin-top: 3px;
  margin-bottom:10px;
  height: 35px;
  position: relative;
}
.carousel-bottom {
  margin: 40px 0;
}
.bigdiv{
  width:100%;height:auto;position:relative;border-bottom:1px solid #ccc;border-top:1px solid #ccc;overflow-x:hidden;
}
.showquan{
  position:absolute;left:0;top:72px;width:80px;height:40px;line-height:40px;font-size:14px;color:#606266;text-align:right;padding-right:15px;
}
</style>
<style scoped>
  .el-select{
    width:100%;
  }
  .el-switch__label.is-active{
    color: #606266 !important;
  }
</style>
<style lang='less'>
.btnContent{
 .el-form-item__content{
   margin-left:0 !important;
 }
}

</style>


