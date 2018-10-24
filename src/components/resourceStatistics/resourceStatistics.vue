<template>
  <div>
    <div class="wraper">
      <div class="server">
        <div class="resource server_color icon iconfont icon-zhuji">主机
          <div>5</div>
        </div>
        <div class="resource cpu_color icon iconfont icon-cpu">CPU
          <el-progress :percentage="80" color="#de1818"></el-progress>
          <span>3/10</span>
        </div>
        <div class="resource ram_color icon iconfont icon-neicun">内存
          <el-progress :percentage="30" color="#0606a9"></el-progress>
          <span>768/9334</span>
        </div>
        <div class="resource disk_color icon iconfont icon-cipan">磁盘
          <el-progress :percentage="20" color="#8e4eab"></el-progress>
          <span>30/1110</span>
        </div>
      </div>
      <div class="service">
        <div class="resource icon iconfont icon-mysql">MySQL
          <div>3</div>
        </div>
        <div class="resource icon iconfont icon-mongodb">MongoDB
          <div>1</div>
        </div>
      </div>
      <div class="consumption">
        <div class="resource">暂无消费数据，请稍后</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.getZone();
  },
  methods: {
    getZone() {
      this.$http.get("/api/statistics/zone_detail").then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="css" scoped>
.wraper > div > div {
  border-radius: 5px;
}

.resource {
  height: 90px;
  background-color: white;
  float: left;
  padding: 15px 10px;
  box-sizing: border-box;
}
.resource:before {
  color: #ccc;
  float: right;
  font-size: 18px;
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
  margin-top: 25px;
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

.server .resource {
  width: 24%;
  margin-right: 16px;
}

.service .resource {
  width: 49%;
  margin-right: 16px;
  margin-top: 20px;
  color: #128bb5;
}

.service .resource > div {
  margin-top: 20px;
  font-size: 18px;
}

.consumption .resource {
  width: 99%;
  margin-top: 20px;
  text-align: center;
  color: gray;
  line-height: 56px;
  font-size: 14px;
}
</style>
