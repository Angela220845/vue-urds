<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="概览">
                <ul>
                    <li>
                        <div>服务ID</div>
                        <span>{{overviewData.service_id}}</span></li>
                    <li>
                        <div>服务名</div>
                        <span>{{overviewData.mongodb_service_name}}</span></li>
                    <li>
                        <div>实例组ID</div>
                        <span>{{overviewData.group_id}}</span></li>
                    <li>
                        <div>可用区</div>
                        <span>{{overviewData.zone_id+'('+overviewData.zone_name+')'}}</span></li>
                    <li>
                        <div>费用</div>
                        <span>{{overviewData.price}}</span></li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="访问方式">
                <ul>
                    <li>
                        <div>MySQL命令行</div>
                        <span>{{overviewData.connection_string[0]}}</span></li>
                    <li>
                        <div>JDBC</div>
                        <span>{{overviewData.connection_string[1]}}</span></li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="运行状态">
                <ul>
                    <li>
                        <div>状态</div>
                        <span>{{overviewData.run_status}}</span></li>
                    <li>
                        <div>创建时间</div>
                        <span>{{overviewData.create_time}}</span></li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="规格：小型">
                <ul>
                    <li>
                        <div>CPU</div>
                        <span>{{overviewData.service_class.cpu}}</span></li>
                    <li>
                        <div>内存</div>
                        <span>{{overviewData.service_class.memory}}</span></li>
                    <li>
                        <div>磁盘</div>
                        <span>{{overviewData.service_class.disk}}</span></li>
                    <li>
                        <div>数据库版本</div>
                        {{'V'+overviewData.mongodb_version}}<span></span></li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="架构：高可用">
                <div>
                    <p><span>CPU:{{overviewData.service_instances[0].cpu}}</span>|<span>内存:{{overviewData.service_instances[0].memory}}</span>|<span>磁盘:{{overviewData.service_instances[0].disk}}</span>
                    </p>
                    <div class="zone_name">{{overviewData.zone_id+'('+overviewData.zone_name+')'}}</div>
                </div>
                <div class="icon iconfont icon-shujuku">
                    <span class="tag">{{overviewData.service_instances[0].role | initialCapitalization}}</span>
                    <p>{{overviewData.service_instances[0].mongodb_id}}</p>
                    <p>{{overviewData.service_instances[0].ip+':'+overviewData.service_instances[0].port}}</p>
                </div>
                <!-- <div class="icon iconfont icon-shujuku">
                    <span class="tag">{{overviewData.service_instances[1].role | initialCapitalization}}</span>
                    <p>{{overviewData.service_instances[1].mongodb_id}}</p>
                    <p>{{overviewData.service_instances[1].ip+':'+overviewData.service_instances[0].port}}</p>
                </div> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  created() {
    this.getOverviewData();
  },
  data() {
    return {
      overviewData: {},
      service_id: ""
    };
  },
  methods: {
    getOverviewData() {
      //  传入params获取数据
      this.axiosApi
        .get("v3/mongodb/service", {
          db_service_id: this.$route.query.db_service_id
        })
        .then(res => {
            this.overviewData = res;
        });
    }
  },
  filters: {
    initialCapitalization(value) {
      if (!value) {
        return "";
      }
      var arr = value.split("_");
      console.log(value);
      return (
        arr[2].charAt(0).toLocaleUpperCase() +
        arr[2].slice(1).toLocaleLowerCase()
      );
    }
  }
};
</script>

<style :lang="css" scoped>
div[role="tabpanel"] {
  padding-left: 40%;
}

div[role="tabpanel"]:last-child {
  padding-left: 0;
}

ul > li {
  margin-top: 20px;
  color: #909399;
}

li > div:first-child {
  float: left;
  width: 150px;
}

#pane-4 {
  height: 200px;
  padding-left: 0;
  position: relative;
}

#pane-4 > div {
  text-align: center;
}

#pane-4 > div:nth-child(1) {
  width: 100%;
  color: green;
  margin-bottom: 40px;
}

#pane-4 > div:nth-child(2) {
  width: 49%;
  height: 160px;
  background-color: #eee;
  clear: both;
  float: left;
  color: #00a8e6;
  padding-top: 20px;
  box-sizing: border-box;
  position: relative;
}

#pane-4 > div:nth-child(2) span {
  border: 1px solid #00a8e6;
}

#pane-4 > div:nth-child(3) {
  width: 49%;
  height: 160px;
  float: right;
  color: #666;
  background-color: #eee;
  padding-top: 20px;
  box-sizing: border-box;
  position: relative;
}

#pane-4 > div:nth-child(3) span {
  border: 1px solid #666;
}

#pane-4 > div:before {
  font-size: 50px;
}

.zone_name {
  float: left;
}

.tag {
  padding: 2px;
  border-radius: 4px;
  font-size: 14px;
  position: absolute;
  left: 10px;
  top: -10px;
}
</style>
