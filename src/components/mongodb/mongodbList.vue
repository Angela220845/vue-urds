<template>
  <div>
    <div class="title">

      <span>区域：</span>
      <el-select v-model="zoneName" filterable placeholder="请选择可用区">
        <el-option v-for="(item,index) in zoneList" :key="index" :label="item.zone_name" :value="item.zone_id">
        </el-option>
      </el-select>
      <span>关键字：</span>
      <el-input v-model="keyword" class="el-input" placeholder="请输入关键词"></el-input>
      <el-button type="primary" @click="getMysqlTableData()">搜索</el-button>
      <template>
                  <el-table
                    :data="mysqlTableData"
                    border
                    style="width: 100%"
                    v-loading="loading">
                    <el-table-column
                      fixedID
                      prop="service_id"
                      label="服务ID"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="mongodb_service_name"
                      label="服务名称"
                      width="120">`
                    </el-table-column>
                    <el-table-column
                      prop="group_id"
                      label="实例组ID"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="service_class.service_class_name"
                      label="服务规格"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="create_time"
                      label="创建时间"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="zone_name"
                      label="可用区名"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="run_status"
                      label="运行状态"
                      width="120"
                      :formatter="formatRunStatus"
                      >
                    </el-table-column>
                      <el-table-column
                      prop="group_name"
                      label="用户组"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="own_user_name"
                      label="用户"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="is_cluster_enable"
                      label="架构"
                      width="100"
                      :formatter="formatArchite"
                      >
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                      <div v-if="scope.row.run_status in mongodbStopStatus">
                         <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            查看
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <router-link :to="'/mongodb_list/mongodb_overview?service_id='+scope.row.service_id">
                              <el-dropdown-item>概览</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_monitor?service_id='+scope.row.service_id">
                              <el-dropdown-item>监控</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_report?service_id='+scope.row.service_id">
                              <el-dropdown-item>巡检报告</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_backupset?service_id='+scope.row.service_id">
                              <el-dropdown-item>备份集</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_params_change?service_id='+scope.row.service_id">
                              <el-dropdown-item>参数变更</el-dropdown-item>
                            </router-link>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <div v-else>
                        <div v-if="scope.row.run_status in mongodbAbnormalRunStatus">
                          <p>--</p>

                        </div>
                        <div v-else>
                        <el-dropdown trigger="click" @command="handCommand" v-show="!(scope.row.run_status in mongodbStopStatus)">
                          <span class="el-dropdown-link">
                            操作
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="scope.row.service_id">停用数据库</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">停用高可用</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">手工备份</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">恢复到备份</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">恢复到时间点</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">销毁</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">水平扩展</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">修改告警对象</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">修改实例规格</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">重置用户密码</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            查看
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <router-link :to="'/mongodb_list/mongodb_overview?service_id='+scope.row.service_id">
                              <el-dropdown-item>概览</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_monitor?service_id='+scope.row.service_id">
                              <el-dropdown-item>监控</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_report?service_id='+scope.row.service_id">
                              <el-dropdown-item>巡检报告</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_backupset?service_id='+scope.row.service_id">
                              <el-dropdown-item>备份集</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_params_change?service_id='+scope.row.service_id">
                              <el-dropdown-item>参数变更</el-dropdown-item>
                            </router-link>
                          </el-dropdown-menu>
                        </el-dropdown>
                        </div>

                    </div>
                  </template>

          </el-table-column>
        </el-table>
      </template>
      <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
<!-- <template>
  <step-modal>
  </step-modal>
</template> -->

  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
  </div>
</template>

<script>
//   import StepModal from "./components/stopHighAvailability.vue";

export default {
  components: {
    //   StepModal
  },
  created() {
    this.getMysqlTableData();
    this.filterMethod();
    this.loading = true;
    console.log(this.instanceStatus);
  },
  data() {
    return {
      options: [],
      keyword: "",
      zoneList: [],
      serviceList: [],
      dialogVisible: false,
      mysqlTableData: [],
      // architeObj:{},
      zoneName: "",
      loading: false,
      mongodbStopStatus: this.instanceStatus.mongodbStopStatus,
      mongodbAbnormalRunStatus: this.instanceStatus.mongodbAbnormalRunStatus
    };
  },
  methods: {
    getMysqlTableData() {
      this.$http
        .get("/api/mongodb/search", {
          params: {
            zone_id: this.zoneName,
            order_by: "create_time",
            order: "desc",
            key_word: this.keyword,
            page: 1,
            number: 20
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.mysqlTableData = res.data.data;
            this.loading = false;
          }
        });
    },
    filterMethod() {
      this.$http.get("/api/zone/search").then(res => {
        if (res.status == 200) {
          this.zoneList = res.data.unshift({
            zone_id: "",
            zone_name: "全部"
          });
          this.zoneList = res.data;
        }
      });
    },
    formatArchite(row, column) {
      let archite = row[column.property] == true ? "三实例集群" : "单实例";
      return archite;
    },
    formatRunStatus(row,column) {
      let runStatus = row[column.property],text,cls;
      switch (runStatus) {
        case "FAILED":
          text = "审批失败";
          cls = "fail";
          break;
        case "APPROVALING":
          text = "等待审批……";
          cls = "cur";
          break;
        case "REFUSED":
          text = "审批已拒绝";
          cls = "fail";
          break;
        case "DESTROYED":
          text = "已销毁";
          cls = "destroy";
          break;
        case "STATUS_MONGODB_HEALTH_OK":
          text = "运行";
          cls = "run_status run_success";
          break;
        case "STATUS_MONGODB_HEALTH_BAD":
          text = "停止";
          cls = "run_status run_error";
          break;
        case "UNKOWN":
        case "STATUS_MONGODB_MGR_BAD":
        case "STATUS_MONGODB_SECONDARY_BAD":
          text = "异常";
          cls = "run_status run_abnormal";
          break;
        case "STATUS_UNKNOWN":
          text = "未知状态";
          cls = "info";
          break;
      }
      return text;
    },
    handleClick(row) {
      console.log(row);
      console.log(this.tableData);
    },
    handCommand(command) {
      this.$confirm("确定停用数据库服务" + command + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisible = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleClose() {
      this.dialogVisible = true;
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="css" scoped>
.title {
  padding-left: 230px;
  background-color: white;
}

.el-select {
  margin-right: 20px;
}

.el-input {
  width: 217px;
}

.el-button {
  margin-left: 15px;
}

.el-dropdown > span {
  color: #409eff;
}

.el-dropdown:hover {
  cursor: pointer;
}

.el-dropdown:nth-child(1) {
  margin-right: 15px;
}

.el-dialog__wrapper > .el-dialog {
  width: 70%;
}
.el-table.el-table--fit.el-table--border.el-table--scrollable-x.el-table--enable-row-transition {
  margin-top: 20px;
}
</style>
