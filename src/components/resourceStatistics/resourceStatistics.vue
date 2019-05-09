<template>
  <div>
    <div class="wraper title" v-loading="loading">
      <div class="server">
        <div class="box_wrapper">
        <div class="resource server_color icon iconfont icon-zhuji">主机
          <div>{{statisticsDetailObj.server}}</div>
        </div>
        </div>
        <div class="box_wrapper">
        <div class="resource cpu_color icon iconfont icon-cpu">CPU
          <el-progress :percentage="cpuPercent" :show-text="false" color="#de1818"></el-progress>
          <span>{{statisticsDetailObj.use_cpu}}/{{statisticsDetailObj.cpu}}</span>
        </div>
        </div>
        <div class="box_wrapper">
        <div class="resource ram_color icon iconfont icon-neicun">内存
          <el-progress :percentage="ramPercent" :show-text="false" color="#0606a9"></el-progress>
          <span>{{statisticsDetailObj.use_memory}}/{{statisticsDetailObj.memory}}</span>
        </div>
        </div>
        <div class="box_wrapper">
        <div class="resource disk_color icon iconfont icon-cipan">磁盘
          <el-progress :percentage="diskPercent" :show-text="false" color="#8e4eab"></el-progress>
          <span>{{statisticsDetailObj.use_disk}}/{{statisticsDetailObj.disk}}</span>
        </div>
        </div>
      </div>
      <div class="service">
        <div class="box_wrapper">
        <div class="resource icon iconfont icon-mysql">MySQL
          <div>{{statisticsDetailObj.mysql_num}}</div>
        </div>
        </div>
        <div class="box_wrapper">
        <div class="resource icon iconfont icon-mongodb">MongoDB
          <div>{{statisticsDetailObj.mongodb_num}}</div>
        </div>
        </div>
      </div>
      <div class="zone_detail">
        <div class="box_wrapper">
          <div class="resource">可用区资源统计
            <template>
              <el-table
                :data="zoneTableData"
                style="width: 100%">
                <el-table-column
                  prop="zone_id"
                  label="可用区"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="zone_name"
                  label="可用区名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="server"
                  label="主机">
                </el-table-column>
                <el-table-column
                  prop="cpu"
                  label="CPU(核)">
                </el-table-column>
                <el-table-column
                  prop="memory"
                  label="内存(MB)">
                </el-table-column>
                <el-table-column
                  prop="disk"
                  label="磁盘(MB)">
                </el-table-column>
                <el-table-column
                  prop="mysql_num"
                  label="MYSQL">
                </el-table-column>
                <el-table-column
                  prop="mongodb_num"
                  label="MongoDB">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
      <div class="consumption">
        <div class="box_wrapper">
        <div class="resource">
          <div v-if="costsData == null">
          暂无消费数据，请稍后再查
          </div>
          <div v-else>
          消费统计
            <template>
              <el-table
                :data="costsData"
                style="width: 100%">
                <el-table-column
                  prop="service_id"
                  label="服务ID"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="service_name"
                  label="服务名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="price_display"
                  label="今日消费(元)">
                </el-table-column>
                <el-table-column
                  prop="total_price_display"
                  label="消费总额(元)">
                </el-table-column>
              </el-table>
            </template>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getZoneDetail();
    this.getStatisticsDetail();
    this.getCostsDetail();
  },
  data() {
    return {
      loading: false,
      statisticsDetailObj: {},
      cpuPercent: 0,
      ramPercent: 0,
      diskPercent: 0,
      zoneTableData: [],
      costsData:[]
    };
  },
  methods: {
    getStatisticsDetail() {
      this.Axios.get("v3/statistics/list").then(res => {
          this.loading = false;
        this.statisticsDetailObj = res.data;
        this.cpuPercent =
          this.statisticsDetailObj.use_cpu / this.statisticsDetailObj.cpu * 100;
        this.ramPercent =
          this.statisticsDetailObj.use_memory /
          this.statisticsDetailObj.memory *
          100;
        this.diskPercent =
          this.statisticsDetailObj.use_disk /
          this.statisticsDetailObj.disk *
          100;
      });
    },
    getZoneDetail() {
      // this.$http.get("/api/statistics/zone_detail").then(res => {
      //   if (res.status == 200) {
      //     this.loading = false;
      //     this.zoneTableData = res.data;
      //   }
      // });
    },
    getCostsDetail() {
      this.Axios.get("v3/statistics/total_costs").then(res => {
          this.loading = false;
          this.costsData = res;
          // 返回数据为空的时候是null
          console.log(res)
        
      });
    }
  }
};
</script>

<style lang="css" scoped>
.resource {
  height: 90px;
  background-color: white;
  padding: 15px 10px;
  box-sizing: border-box;
  border-radius: 5px;
}
.server,
.service,
.consumption,
.zone_detail {
  margin: 1px -10px;
  overflow: hidden;
}
.server .box_wrapper {
  padding: 10px;
  width: 25%;
  float: left;
  box-sizing: border-box;
}
.service .box_wrapper {
  padding: 10px;
  width: 50%;
  float: left;
  box-sizing: border-box;
}
.consumption .box_wrapper {
  padding: 10px;
  width: 100%;
  float: left;
  box-sizing: border-box;
  text-align: center;
  color: gray;
  line-height: 56px;
  font-size: 14px;
}
.resource:before {
  color: #ccc;
  font-size: 18px;
  float: right;
}

.el-progress {
  margin: 10px 0px 0px 0px;
}

.resource > span {
  color: #666;
  font-size: 12px;
}

.server_color {
  color: green;
}

.server_color > div {
  font-size: 18px;
}

.cpu_color {
  color: #de1818;
}

.disk_color {
  color: #8e4eab;
}

.ram_color {
  color: #0606a9;
}
.resource {
  font-size: 18px;
}
.service .resource {
  font-size: 18px;
  color: #128bb5;
}
.server .resource > div {
  margin-top: 28px;
}
.service .resource > div {
  margin-top: 28px;
}
.consumption .resource {
  font-size: 12px;
}
.zone_detail .resource {
  height: 100%;
  color: #0f6fca;
}
</style>
