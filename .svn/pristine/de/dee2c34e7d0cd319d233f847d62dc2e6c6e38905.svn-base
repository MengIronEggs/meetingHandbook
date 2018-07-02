<style scoped>
    .page {
        overflow: auto;
        padding: 10px;
    }

    .trip-table {
        border-collapse: collapse;
        width: 2000px;
        font-size: 12px;
    }

    th, td {
        text-align: center;
        border: 1px solid #333;
        background: #ddd;
        color: #888;
    }

    th {
        width: 200px;
        cursor: pointer;
        user-select: none;
        font-size: 16px;
        line-height: 24px;
    }

    th.active {
        background: #fff;
        color: #333;
    }

    td.active {
        background: #fff;
        color: #333;
    }

    .submit-btn{
        width: 200px;
        margin-bottom: 10px;
    }
</style>

<template>
    <div class="page">

        <el-button class="submit-btn" type="primary" round @click="set">保存</el-button>

        <table class="trip-table">
            <thead>
            <tr>
                <th class="active" style="width: 70px">序号</th>
                <th v-for="(son, key) in selectColumn" :class="{active: selectColumn[key].select}" @click="selectItem(key)">{{selectColumn[key].name}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in tripData">
                <td class="active" style="width: 70px">{{index + 1}}</td>
                <td v-for="(son, key) in selectColumn" :class="{active: selectColumn[key].select}">{{item[key]}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                mid: this.$route.query.mid,
                tripData: [],
                selectColumn: {
                    Companyname: {name: '公司名称', select: true},
                    Department: {name: '部门', select: true},
                    Username: {name: '姓名', select: true},
                    Activities: {name: '活动事项', select: true},
                    Sex: {name: '性别', select: true},
                    Phonenum: {name: '联系方式', select: true},
                    Stayinfo: {name: '住宿信息', select: true},
                    Cometime: {name: '入住时间', select: true},
                    Roomnum: {name: '入住房间', select: true},
                    Roomtype: {name: '房间类型', select: true},
                    Cometripinfo: {name: '来程行程信息', select: true},
                    Comecontactpersion: {name: '来程联系人', select: true},
                    Backtripinfo: {name: '回程行程信息', select: true},
                    Backcontactperson: {name: '回程联系人', select: true},
                    Sepacialinfo: {name: '特殊事项', select: true},
                },
            }
        },

        created() {
            this.init()
        },

        mounted() {

        },

        methods: {
            init() {
                this.$get(`TrainShowCol?pid=${this.mid}`).then(res => {
                    if (res.Data.length) {
                        const Showcolname = JSON.parse(res.Data[0].Showcolname);
                        for(const key in Showcolname){
                            if(key && this.selectColumn[key]){
                                this.selectColumn[key].select = Showcolname[key].select;
                            }
                        }
                    }
                });

                this.$get(`MeetingTripList?pid=${this.mid}&porn=`).then(res => {
                    if (res.Data) {
                        this.tripData = res.Data
                    }
                });
            },

            selectItem(item) {
                this.selectColumn[item].select = !this.selectColumn[item].select;
            },

            set() {
                this.$post(`SetTrainShowCol?pid=${this.mid}`, [{Showcolname: JSON.stringify(this.selectColumn)}]).then(res => {
                    if(res.Code === 200){
                        this.$showMsgTip(`保存成功`);
                    }else{
                        this.$showErrorTip(`保存失败`)
                    }
                })
            }
        },

        computed: {},

        components: {}
    }
</script>
