<style scoped>
.page {
  overflow: auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
}

.item {
  margin: 5px;
  transition: 2s ease-in-out;
}

.item.active {
  transform: rotateY(360deg);
}
</style>

<template>
    <div class="page">

        <el-tag class="item" :class="{active: item.sign}" :disable-transitions="true" v-for="(item, index) in staffMap" :key="index" v-if="item.name"
                :type="item.sign ? `success` : `info`">
            {{item.name}}
        </el-tag>

    </div>
</template>

<script>
export default {
  data() {
    return {
      mid: this.$route.query.mid,
      staffMap: {},
      socket: null
    };
  },

  created() {
    this.init();
  },

  mounted() {},

  destroyed() {
    this.socket.close();
  },

  methods: {
    async init() {
      await this.getStaffList();
      await this.getSignList();
      this.createSocket();
    },

    createSocket() {
      this.socket = this.$webSocket(`SignListWS?pid=${this.mid}`);

      let _socket = this.socket;

      _socket.onopen = evt => {
        console.log("Connected");
      };

      _socket.onmessage = evt => {
        let res = JSON.parse(evt.data);
        this.staffMap[res.Data.Userphone].sign = true;
      };

      _socket.onerror = evt => {
        this.createSocket();
      };
    },

    getStaffList() {
      return this.$get(`MeetingTripList?pid=${this.mid}&porn=`).then(res => {
        if (res.Data) {
          const staffMap = {};
          res.Data.map(item => {
            staffMap[item.Phonenum] = {
              phone: item.Phonenum,
              name: item.Username,
              sign: false
            };
          });
          this.staffMap = staffMap;
        //   console.log("里面的值", this.staffMap);
        }
      });
    },

    getSignList() {
      return this.$get(`SignList?pid=${this.mid}`).then(res => {
        if (res.Data) {
        //   console.log(res.Data);
          res.Data.map(item => {
            if (this.staffMap[item.Userphone]) {
            //   console.log("1234", this.staffMap[item.Userphone].sign);
              this.staffMap[item.Userphone].sign = true;
            }

            //
          });
        }
      });
    }
  },

  computed: {},

  components: {}
};
</script>
