<template>
  <div>
    <div class="title">

      <span>区域：</span>
      <el-select v-model="zoneName" filterable placeholder="请选择可用区">
        <el-option v-for="(item,index) in zoneList" :key="index" :label="item.zone_name" :value="item.zone_name">
        </el-option>
      </el-select>
      <span>关键字：</span>
      <el-input v-model="keyword" class="el-input" placeholder="请输入关键词"></el-input>
      <el-button type="primary">搜索</el-button>
      <template>
                  <el-table
                    :data="mysqlTableData"
                    border
                    style="width: 100%"
                    v-loading="loading"
                    >
                    <el-table-column
                      fixedID
                      prop="service_id"
                      label="服务ID"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="db_service_name"
                      label="服务名称"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="mysql_group_id"
                      label="实例组ID"
                      width="120"
                      :formatter="formatGroupId"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="service_class"
                      label="服务规格"
                      width="100"
                      :formatter="formatClass"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="create_time"
                      label="创建时间"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="create_time"
                      label="监控"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="uptime"
                      label="Uptime"
                      width="120"
                      :formatter="formatUptime"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="qps"
                      label="QPS"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="zone_name"
                      label="可用区名"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="run_status"
                      label="运行状态"
                      width="120">
                      <template slot-scope="scope">
                        <div v-if="scope.row.run_status==='APPROVALING'">
                          <span class="run_status cur"><span>等待审批……</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'FAILED'">
                        <span class="run_status fail"><span>审批失败</span></span>
                        </div>
                         <div v-else-if="scope.row.run_status === 'DESTROYED'">
                        <span class="run_status destroy"><span>已销毁</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'STATUS_MYSQL_HEALTH_OK'">
                        <span class="run_status run_success"><span>运行</span></span>
                        </div>
                         <div v-else-if="scope.row.run_status === 'REFUSED'">
                        <span class="run_status cur"><span>拒绝审批</span></span>
                        </div>
                        <div v-else-if="(scope.row.run_status in instanceStatus.mysqlStopStatus) && (scope.row.run_status in instanceStatus.mysqlAbnormalRunStatus)">
                          <span class="run_status run_error"><span>停止</span></span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="uguard_status"
                      label="高可用状态"
                      width="120"
                      :formatter="formatHaStatus"
                      >
                      <template slot-scope="scope">
                        <div v-if="haStatusObj[scope.row.uguard_status]">
                        <el-popover trigger="hover" placement="top" popper-class="popover_style" :content="haStatusObj[scope.row.uguard_status].description">
                        <div slot="reference" :class="haStatusObj[scope.row.uguard_status].className">{{haStatusObj[scope.row.uguard_status].status}}</div>
                        </el-popover>
                       </div>
                      </template>
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
                      prop="temp_instances"
                      label="临时实例"
                      width="120">
                      <template slot-scope="scope">
                        <div v-if="(scope.row.run_status in instanceStatus.mysqlStopStatus)|| scope.row.is_mgr_enable || (scope.row.temp_instances.length == 0)">
                          --
                        </div>
                        <div v-else>
                          <span class="view_temp_inst">查看</span>|<span class="destroy_temp_inst">销毁</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="archite"
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
                        <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            查看
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <router-link :to="'/mysql_list/mysql_overview?service_id='+scope.row.service_id">
                              <el-dropdown-item>概览</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mysql_list/mysql_monitor?service_id='+scope.row.service_id">
                              <el-dropdown-item>监控</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mysql_list/mysql_report?service_id='+scope.row.service_id">
                              <el-dropdown-item>巡检报告</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mysql_list/mysql_backupset?service_id='+scope.row.service_id">
                              <el-dropdown-item>备份集</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mysql_list/mysql_params_change?service_id='+scope.row.service_id">
                              <el-dropdown-item>参数变更</el-dropdown-item>
                            </router-link>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown trigger="click" @command="handCommand">
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
</template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
<template>
  <step-modal>
  </step-modal>
</template>

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
import StepModal from "./components/stopHighAvailability.vue";

export default {
  components: {
    StepModal
  },
  created() {
    this.getMysqlTableData();
    // this.getMonitorData();
    this.loading = true;
  },
  data() {
    return {
      options: [],
      keyword: "",
      zoneList: [],
      serviceList: [],
      dialogVisible: false,
      mysqlTableData: [],
      zoneName: "",
      loading: false,
      mysqlIdStr: [],
      uguardStatusObj: {},
      haStatusObj: {
        UGUARD_MANAGER_DOWN: {
          status: "故障(Manager)",
          className: "run_malfunction"
        },
        UGUARD_PRIMARY_SLAVE_ENABLE: {
          status: "可切换",
          className: "run_checkout"
        },
        UGUARD_NO_PRIMARY_SLAVE: {
          status: "不可切换",
          description: "没有可切换的备机",
          className: "run_not_checkout"
        },
        SLA_IS_DISABLED: {
          status: "不可切换",
          description: "没有开启sla服务",
          className: "run_not_checkout"
        },
        UGUARD_DISABLE: {
          status: "未配置",
          className: "run_not_configuration"
        }
      },
      masterMysqlId:''
    };
  },
  methods: {
    getMysqlTableData() {
      let mysqlIdList = [];
      this.axiosApi
        .get("/db_service/search", {
          zone_id: "",
          order_by: "create_time",
          order: "desc",
          key_word: "",
          page: 1,
          number: 20
        })
        .then(res => {
          this.mysqlTableData = res;
          this.loading = false;

          res.map(item => {
            mysqlIdList.push(item.service_id);
          });
          this.mysqlIdStr = mysqlIdList.join(",");
          this.axiosApi
            .get("/db_service/list_stats", {
              service_ids: this.mysqlIdStr
            })
            .then(response => {
              for (let item of this.mysqlTableData) {
                for (let value of this.mysqlTableData) {
                  this.$set(
                    value,
                    "uguard_status",
                    response[item.service_id].uguard_status
                  );
                }
              }
            });
        });
    },
    getMonitorData() {
      let endTime = parseInt((new Date).getTime() / Math.pow(10, 3)),
            startTime = endTime - 60 * 60;
      this.axiosApi.get("/db_service/mysql_monitors", {
        master_mysql_ids: "mysql-wz5f8l",
        start_unix_time: startTime,
        end_unix_time: endTime
      });
    },
    formatClass(row, column) {
      return row.service_class.service_class_name;
    },
    formatArchite(row, column) {
      let architeObj = {
          is_ha_enable: row.is_ha_enable,
          is_mgr_enable: row.is_mgr_enable,
          is_ra_enable: row.is_ra_enable,
          is_rws_enable: row.is_rws_enable
        },
        archite = "",
        extend = "",
        architecture = "";
      archite = this.instanceStatus.mysqlArchite(architeObj).origin;
      extend = this.instanceStatus.mysqlArchite(architeObj).extend;
      architecture = this.instanceStatus.mysqlArchite(architeObj).architecture;
      return archite;
    },
    formatGroupId(row) {
      let groupId =
        row.run_status in this.instanceStatus.destroyStatus
          ? "--"
          : row.mysql_group_id;
      return groupId;
    },
    formatUptime(row) {},
    formatHaStatus(row, column) {
      return row[column.property];
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
span.fail {
  color: #ec6d6d;
  background-color: #fadede;
  display: block;
}
span.cur {
  color: #8a6d3b;
  background-color: #fcf8e3;
  display: block;
}
span.destroy {
  background-color: #ccc;
  display: block;
}
span.run_status > span {
  margin-left: 10px;
}
span.run_success {
  color: #26922b;
}

span.run_error {
  color: #ff5200;
}
span.run_error::before {
  background-color: red;
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  content: "";
  -webkit-box-shadow: 2px 2px 6px #c7b852;
  -moz-box-shadow: 2px 2px 6px #c7b852;
  -ms-box-shadow: 2px 2px 6px #c7b852;
  -o-box-shadow: 2px 2px 6px #c7b852;
  box-shadow: 2px 2px 6px #c7b852;
}
span.run_abnormal {
  color: #d0bd50;
}
span.run_abnormal::before {
  background-color: #f1d82f;
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  content: "";
  -webkit-box-shadow: 2px 2px 6px #c7b852;
  -moz-box-shadow: 2px 2px 6px #c7b852;
  -ms-box-shadow: 2px 2px 6px #c7b852;
  -o-box-shadow: 2px 2px 6px #c7b852;
  box-shadow: 2px 2px 6px #c7b852;
}
.view_temp_inst,
.destroy_temp_inst {
  border-bottom: 1px dotted green;
}
.run_checkout {
  color: green;
}

.run_not_checkout {
  color: #d0bd50;
}

.run_malfunction {
  color: red;
}

.run_not_configuration {
  color: gray;
}
.popover_style p {
  color: #d0bd50;
}
</style>
